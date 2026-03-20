import { Request, Response } from "express";
import { HealthService } from "../services/health.service";
import { HealthRepository } from "../repositories/health.repository";

const service = new HealthService(new HealthRepository());

export async function getHealth(_req: Request, res: Response) {
  const result = await service.ping();
  res.json(result);
}
