import { prisma } from "../utils/prisma";
import { UserRole } from "../../prisma/generated/client";

export class UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  async createUser(input: { email: string; passwordHash: string; role: UserRole }) {
    return prisma.user.create({ data: input });
  }

  async markEmailVerified(userId: string) {
    return prisma.user.update({ where: { id: userId }, data: { emailVerified: true } });
  }
}
