import { Router } from "express";
import courseRoutes from "./course.routes";

const router = Router();

router.use(courseRoutes);

router.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

export default router;
