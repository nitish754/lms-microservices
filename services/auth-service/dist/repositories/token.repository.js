"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenRepository = void 0;
const prisma_1 = require("../utils/prisma");
class TokenRepository {
    async createEmailToken(input) {
        return prisma_1.prisma.emailVerification.create({ data: input });
    }
    async findEmailToken(tokenHash) {
        return prisma_1.prisma.emailVerification.findUnique({ where: { tokenHash } });
    }
    async markEmailTokenUsed(id) {
        return prisma_1.prisma.emailVerification.update({ where: { id }, data: { usedAt: new Date() } });
    }
    async createRefreshToken(input) {
        return prisma_1.prisma.refreshToken.create({ data: input });
    }
    async findRefreshToken(tokenHash) {
        return prisma_1.prisma.refreshToken.findUnique({ where: { tokenHash } });
    }
    async revokeRefreshToken(id) {
        return prisma_1.prisma.refreshToken.update({ where: { id }, data: { revokedAt: new Date() } });
    }
}
exports.TokenRepository = TokenRepository;
