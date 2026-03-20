"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const shared_1 = require("@lms/shared");
const crypto_1 = require("../utils/crypto");
const ACCESS_TTL_MIN = 15;
const REFRESH_TTL_DAYS = 30;
const VERIFY_TTL_MIN = 60;
class AuthService {
    constructor(users, tokens) {
        this.users = users;
        this.tokens = tokens;
    }
    get jwtSecret() {
        const secret = process.env.JWT_SECRET;
        if (!secret)
            throw new Error("JWT_SECRET is required");
        return secret;
    }
    async signup(input) {
        const existing = await this.users.findByEmail(input.email);
        if (existing)
            throw new shared_1.AppError("Email already in use", 409, "EMAIL_TAKEN");
        const passwordHash = await bcryptjs_1.default.hash(input.password, 10);
        const user = await this.users.createUser({
            email: input.email,
            passwordHash,
            role: input.role
        });
        const token = (0, crypto_1.randomToken)();
        const tokenHash = (0, crypto_1.sha256)(token);
        const expiresAt = new Date(Date.now() + VERIFY_TTL_MIN * 60 * 1000);
        await this.tokens.createEmailToken({ userId: user.id, tokenHash, expiresAt });
        return { message: "Verification email sent", verificationToken: token };
    }
    async verifyEmail(token) {
        const tokenHash = (0, crypto_1.sha256)(token);
        const record = await this.tokens.findEmailToken(tokenHash);
        if (!record || record.usedAt)
            throw new shared_1.AppError("Invalid token", 400, "INVALID_TOKEN");
        if (record.expiresAt < new Date())
            throw new shared_1.AppError("Token expired", 400, "TOKEN_EXPIRED");
        await this.tokens.markEmailTokenUsed(record.id);
        await this.users.markEmailVerified(record.userId);
        return { message: "Email verified" };
    }
    async login(email, password) {
        const user = await this.users.findByEmail(email);
        if (!user)
            throw new shared_1.AppError("Invalid credentials", 401, "INVALID_CREDENTIALS");
        if (!user.emailVerified)
            throw new shared_1.AppError("Email not verified", 403, "EMAIL_NOT_VERIFIED");
        if (user.status !== "ACTIVE")
            throw new shared_1.AppError("User disabled", 403, "USER_DISABLED");
        const ok = await bcryptjs_1.default.compare(password, user.passwordHash);
        if (!ok)
            throw new shared_1.AppError("Invalid credentials", 401, "INVALID_CREDENTIALS");
        const accessToken = jsonwebtoken_1.default.sign({ sub: user.id, role: user.role }, this.jwtSecret, { expiresIn: `${ACCESS_TTL_MIN}m` });
        const refreshToken = (0, crypto_1.randomToken)();
        const tokenHash = (0, crypto_1.sha256)(refreshToken);
        const expiresAt = new Date(Date.now() + REFRESH_TTL_DAYS * 24 * 60 * 60 * 1000);
        await this.tokens.createRefreshToken({ userId: user.id, tokenHash, expiresAt });
        return { accessToken, refreshToken };
    }
    async refresh(refreshToken) {
        const tokenHash = (0, crypto_1.sha256)(refreshToken);
        const record = await this.tokens.findRefreshToken(tokenHash);
        if (!record || record.revokedAt)
            throw new shared_1.AppError("Invalid token", 401, "INVALID_TOKEN");
        if (record.expiresAt < new Date())
            throw new shared_1.AppError("Token expired", 401, "TOKEN_EXPIRED");
        await this.tokens.revokeRefreshToken(record.id);
        const user = await this.users.findById(record.userId);
        if (!user)
            throw new shared_1.AppError("User not found", 404, "USER_NOT_FOUND");
        const accessToken = jsonwebtoken_1.default.sign({ sub: user.id, role: user.role }, this.jwtSecret, { expiresIn: `${ACCESS_TTL_MIN}m` });
        const newRefreshToken = (0, crypto_1.randomToken)();
        const newHash = (0, crypto_1.sha256)(newRefreshToken);
        const expiresAt = new Date(Date.now() + REFRESH_TTL_DAYS * 24 * 60 * 60 * 1000);
        await this.tokens.createRefreshToken({ userId: user.id, tokenHash: newHash, expiresAt });
        return { accessToken, refreshToken: newRefreshToken };
    }
    async logout(refreshToken) {
        const tokenHash = (0, crypto_1.sha256)(refreshToken);
        const record = await this.tokens.findRefreshToken(tokenHash);
        if (!record || record.revokedAt)
            return { message: "ok" };
        await this.tokens.revokeRefreshToken(record.id);
        return { message: "ok" };
    }
}
exports.AuthService = AuthService;
