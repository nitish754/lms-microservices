import { prisma } from "../utils/prisma";

export class TokenRepository {
  async createEmailToken(input: { userId: string; tokenHash: string; expiresAt: Date }) {
    return prisma.emailVerification.create({ data: input });
  }

  async findEmailToken(tokenHash: string) {
    return prisma.emailVerification.findUnique({ where: { tokenHash } });
  }

  async markEmailTokenUsed(id: string) {
    return prisma.emailVerification.update({ where: { id }, data: { usedAt: new Date() } });
  }

  async createRefreshToken(input: { userId: string; tokenHash: string; expiresAt: Date }) {
    return prisma.refreshToken.create({ data: input });
  }

  async findRefreshToken(tokenHash: string) {
    return prisma.refreshToken.findUnique({ where: { tokenHash } });
  }

  async revokeRefreshToken(id: string) {
    return prisma.refreshToken.update({ where: { id }, data: { revokedAt: new Date() } });
  }
}
