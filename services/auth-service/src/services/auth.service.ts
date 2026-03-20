import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "@lms/shared";
import { UserRepository } from "../repositories/user.repository";
import { TokenRepository } from "../repositories/token.repository";
import { randomToken, sha256 } from "../utils/crypto";
import { UserRole } from "../../prisma/generated/client";

const ACCESS_TTL_MIN = 15;
const REFRESH_TTL_DAYS = 30;
const VERIFY_TTL_MIN = 60;

export class AuthService {
  constructor(
    private readonly users: UserRepository,
    private readonly tokens: TokenRepository
  ) {}

  private get jwtSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is required");
    return secret;
  }

  async signup(input: { email: string; password: string; role: UserRole }) {
    const existing = await this.users.findByEmail(input.email);
    if (existing) throw new AppError("Email already in use", 409, "EMAIL_TAKEN");

    const passwordHash = await bcrypt.hash(input.password, 10);
    const user = await this.users.createUser({
      email: input.email,
      passwordHash,
      role: input.role
    });

    const token = randomToken();
    const tokenHash = sha256(token);
    const expiresAt = new Date(Date.now() + VERIFY_TTL_MIN * 60 * 1000);
    await this.tokens.createEmailToken({ userId: user.id, tokenHash, expiresAt });

    return { message: "Verification email sent", verificationToken: token };
  }

  async verifyEmail(token: string) {
    const tokenHash = sha256(token);
    const record = await this.tokens.findEmailToken(tokenHash);
    if (!record || record.usedAt) throw new AppError("Invalid token", 400, "INVALID_TOKEN");
    if (record.expiresAt < new Date()) throw new AppError("Token expired", 400, "TOKEN_EXPIRED");

    await this.tokens.markEmailTokenUsed(record.id);
    await this.users.markEmailVerified(record.userId);
    return { message: "Email verified" };
  }

  async login(email: string, password: string) {
    const user = await this.users.findByEmail(email);
    if (!user) throw new AppError("Invalid credentials", 401, "INVALID_CREDENTIALS");
    if (!user.emailVerified) throw new AppError("Email not verified", 403, "EMAIL_NOT_VERIFIED");
    if (user.status !== "ACTIVE") throw new AppError("User disabled", 403, "USER_DISABLED");

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new AppError("Invalid credentials", 401, "INVALID_CREDENTIALS");

    const accessToken = jwt.sign(
      { sub: user.id, role: user.role },
      this.jwtSecret,
      { expiresIn: `${ACCESS_TTL_MIN}m` }
    );

    const refreshToken = randomToken();
    const tokenHash = sha256(refreshToken);
    const expiresAt = new Date(Date.now() + REFRESH_TTL_DAYS * 24 * 60 * 60 * 1000);
    await this.tokens.createRefreshToken({ userId: user.id, tokenHash, expiresAt });

    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string) {
    const tokenHash = sha256(refreshToken);
    const record = await this.tokens.findRefreshToken(tokenHash);
    if (!record || record.revokedAt) throw new AppError("Invalid token", 401, "INVALID_TOKEN");
    if (record.expiresAt < new Date()) throw new AppError("Token expired", 401, "TOKEN_EXPIRED");

    await this.tokens.revokeRefreshToken(record.id);

    const user = await this.users.findById(record.userId);
    if (!user) throw new AppError("User not found", 404, "USER_NOT_FOUND");

    const accessToken = jwt.sign(
      { sub: user.id, role: user.role },
      this.jwtSecret,
      { expiresIn: `${ACCESS_TTL_MIN}m` }
    );

    const newRefreshToken = randomToken();
    const newHash = sha256(newRefreshToken);
    const expiresAt = new Date(Date.now() + REFRESH_TTL_DAYS * 24 * 60 * 60 * 1000);
    await this.tokens.createRefreshToken({ userId: user.id, tokenHash: newHash, expiresAt });

    return { accessToken, refreshToken: newRefreshToken };
  }

  async logout(refreshToken: string) {
    const tokenHash = sha256(refreshToken);
    const record = await this.tokens.findRefreshToken(tokenHash);
    if (!record || record.revokedAt) return { message: "ok" };
    await this.tokens.revokeRefreshToken(record.id);
    return { message: "ok" };
  }
}
