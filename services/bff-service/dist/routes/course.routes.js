"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_controller_1 = require("../controllers/course.controller");
const router = (0, express_1.Router)();
router.get("/bff/courses", course_controller_1.getCourseList);
router.get("/bff/courses/:id", course_controller_1.getCourseDetail);
exports.default = router;
