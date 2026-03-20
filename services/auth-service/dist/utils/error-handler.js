"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const shared_1 = require("@lms/shared");
const zod_1 = require("zod");
function errorHandler(err, _req, res, _next) {
    if (err instanceof zod_1.ZodError) {
        return res.status(400).json({
            code: "VALIDATION_ERROR",
            message: "Invalid request",
            issues: err.issues
        });
    }
    if (err instanceof shared_1.AppError) {
        return res.status(err.status).json({ code: err.code, message: err.message });
    }
    return res.status(500).json({ code: "INTERNAL_ERROR", message: "Something went wrong" });
}
