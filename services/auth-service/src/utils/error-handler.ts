import { NextFunction, Request, Response } from "express";
import { AppError } from "@lms/shared";
import { ZodError } from "zod";

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      code: "VALIDATION_ERROR",
      message: "Invalid request",
      issues: err.issues
    });
  }

  if (err instanceof AppError) {
    return res.status(err.status).json({ code: err.code, message: err.message });
  }

  return res.status(500).json({ code: "INTERNAL_ERROR", message: "Something went wrong" });
}
