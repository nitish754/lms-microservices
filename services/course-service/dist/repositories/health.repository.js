"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthRepository = void 0;
const prisma_1 = require("../utils/prisma");
class HealthRepository {
    async ping() {
        return prisma_1.prisma.healthPing.create({ data: {} });
    }
}
exports.HealthRepository = HealthRepository;
