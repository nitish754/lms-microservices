import { AuthService } from "../src/services/auth.service";
import { UserRole } from "@prisma/client";

class UserRepoMock {
  user: any = null;
  async findByEmail(email: string) {
    return this.user?.email === email ? this.user : null;
  }
  async findById(id: string) {
    return this.user?.id === id ? this.user : null;
  }
  async createUser(input: any) {
    this.user = { id: "u1", email: input.email, passwordHash: input.passwordHash, role: input.role, status: "ACTIVE", emailVerified: false };
    return this.user;
  }
  async markEmailVerified() {
    if (this.user) this.user.emailVerified = true;
  }
}

class TokenRepoMock {
  emailToken: any = null;
  refreshToken: any = null;
  async createEmailToken(input: any) {
    this.emailToken = { id: "e1", ...input, usedAt: null };
    return this.emailToken;
  }
  async findEmailToken() {
    return this.emailToken;
  }
  async markEmailTokenUsed() {
    if (this.emailToken) this.emailToken.usedAt = new Date();
  }
  async createRefreshToken(input: any) {
    this.refreshToken = { id: "r1", ...input, revokedAt: null };
    return this.refreshToken;
  }
  async findRefreshToken() {
    return this.refreshToken;
  }
  async revokeRefreshToken() {
    if (this.refreshToken) this.refreshToken.revokedAt = new Date();
  }
}

describe("auth service (unit)", () => {
  beforeEach(() => {
    process.env.JWT_SECRET = "test";
  });

  it("signs up and returns verification token", async () => {
    const service = new AuthService(new UserRepoMock() as any, new TokenRepoMock() as any);
    const result = await service.signup({ email: "a@b.com", password: "password123", role: UserRole.STUDENT });
    expect(result.verificationToken).toBeTruthy();
  });
});
