import { prisma } from "../utils/prisma";

export class HealthRepository {
  async ping() {
    return prisma.healthPing.create({ data: {} });
  }
}
