"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_routes_1 = __importDefault(require("./course.routes"));
const router = (0, express_1.Router)();
router.use(course_routes_1.default);
router.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});
exports.default = router;
