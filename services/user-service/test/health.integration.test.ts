import request from "supertest";
import { createApp } from "../src/app";

const hasDb = Boolean(process.env.DATABASE_URL);

(hasDb ? describe : describe.skip)("health (integration)", () => {
  it("returns ok", async () => {
    const app = createApp();
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});
