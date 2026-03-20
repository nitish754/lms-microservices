"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutSchema = exports.refreshSchema = exports.verifyEmailSchema = exports.loginSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
    role: zod_1.z.enum(["STUDENT", "TEACHER"]).default("STUDENT")
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8)
});
exports.verifyEmailSchema = zod_1.z.object({
    token: zod_1.z.string().min(10)
});
exports.refreshSchema = zod_1.z.object({
    refreshToken: zod_1.z.string().min(10)
});
exports.logoutSchema = exports.refreshSchema;
