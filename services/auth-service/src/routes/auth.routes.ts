import { Router } from "express";
import {
  signup,
  login,
  verifyEmail,
  refresh,
  logout
} from "../controllers/auth.controller";

const router = Router();

router.post("/auth/signup", signup);
router.post("/auth/login", login);
router.post("/auth/verify-email", verifyEmail);
router.post("/auth/refresh", refresh);
router.post("/auth/logout", logout);

export default router;
