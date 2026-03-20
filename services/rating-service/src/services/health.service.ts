import { HealthRepository } from "../repositories/health.repository";

export class HealthService {
  constructor(private readonly repo: HealthRepository) {}

  async ping() {
    await this.repo.ping();
    return { status: "ok" } as const;
  }
}
