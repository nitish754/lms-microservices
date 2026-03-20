import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["STUDENT", "TEACHER"]).default("STUDENT")
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const verifyEmailSchema = z.object({
  token: z.string().min(10)
});

export const refreshSchema = z.object({
  refreshToken: z.string().min(10)
});

export const logoutSchema = refreshSchema;
