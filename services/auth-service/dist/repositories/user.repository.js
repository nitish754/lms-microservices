"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const prisma_1 = require("../utils/prisma");
class UserRepository {
    async findByEmail(email) {
        return prisma_1.prisma.user.findUnique({ where: { email } });
    }
    async findById(id) {
        return prisma_1.prisma.user.findUnique({ where: { id } });
    }
    async createUser(input) {
        return prisma_1.prisma.user.create({ data: input });
    }
    async markEmailVerified(userId) {
        return prisma_1.prisma.user.update({ where: { id: userId }, data: { emailVerified: true } });
    }
}
exports.UserRepository = UserRepository;
