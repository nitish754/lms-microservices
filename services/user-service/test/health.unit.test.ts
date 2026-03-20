import { HealthService } from "../src/services/health.service";

class MockRepo {
  async ping() {
    return { id: "test" };
  }
}

describe("health service (unit)", () => {
  it("returns ok", async () => {
    const service = new HealthService(new MockRepo() as any);
    const result = await service.ping();
    expect(result.status).toBe("ok");
  });
});
