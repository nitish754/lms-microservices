import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { UserRepository } from "../repositories/user.repository";
import { TokenRepository } from "../repositories/token.repository";
import {
  loginSchema,
  signupSchema,
  verifyEmailSchema,
  refreshSchema,
  logoutSchema
} from "../validators/auth.validator";

const service = new AuthService(new UserRepository(), new TokenRepository());

export async function signup(req: Request, res: Response) {
  const body = signupSchema.parse(req.body);
  const result = await service.signup(body);
  res.status(201).json(result);
}

export async function verifyEmail(req: Request, res: Response) {
  const body = verifyEmailSchema.parse(req.body);
  const result = await service.verifyEmail(body.token);
  res.json(result);
}

export async function login(req: Request, res: Response) {
  const body = loginSchema.parse(req.body);
  const result = await service.login(body.email, body.password);
  res.json(result);
}

export async function refresh(req: Request, res: Response) {
  const body = refreshSchema.parse(req.body);
  const result = await service.refresh(body.refreshToken);
  res.json(result);
}

export async function logout(req: Request, res: Response) {
  const body = logoutSchema.parse(req.body);
  const result = await service.logout(body.refreshToken);
  res.json(result);
}
