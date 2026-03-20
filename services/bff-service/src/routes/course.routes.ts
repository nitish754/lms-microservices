import { Router } from "express";
import { getCourseDetail, getCourseList } from "../controllers/course.controller";

const router = Router();

router.get("/bff/courses", getCourseList);
router.get("/bff/courses/:id", getCourseDetail);

export default router;
