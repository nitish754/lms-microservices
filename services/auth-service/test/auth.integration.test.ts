import request from "supertest";
import { createApp } from "../src/app";

const hasDb = Boolean(process.env.DATABASE_URL && process.env.JWT_SECRET);

(hasDb ? describe : describe.skip)("auth (integration)", () => {
  it("signup -> verify -> login", async () => {
    const app = createApp();

    const signup = await request(app)
      .post("/auth/signup")
      .send({ email: "test@example.com", password: "password123", role: "STUDENT" });

    expect(signup.status).toBe(201);
    const token = signup.body.verificationToken;

    const verify = await request(app)
      .post("/auth/verify-email")
      .send({ token });
    expect(verify.status).toBe(200);

    const login = await request(app)
      .post("/auth/login")
      .send({ email: "test@example.com", password: "password123" });
    expect(login.status).toBe(200);
    expect(login.body.accessToken).toBeTruthy();
    expect(login.body.refreshToken).toBeTruthy();
  });
});
