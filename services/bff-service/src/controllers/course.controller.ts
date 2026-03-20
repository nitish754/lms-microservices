import { Request, Response } from "express";

export async function getCourseList(_req: Request, res: Response) {
  res.status(501).json({ message: "Not implemented" });
}

export async function getCourseDetail(_req: Request, res: Response) {
  res.status(501).json({ message: "Not implemented" });
}
