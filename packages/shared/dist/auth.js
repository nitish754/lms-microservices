"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authContext = authContext;
exports.requireAuth = requireAuth;
const errors_1 = require("./errors");
const ROLE_VALUES = new Set(["STUDENT", "TEACHER", "ADMIN", "SYSTEM"]);
function authContext() {
    return (req, _res, next) => {
        const userId = req.header("x-user-id");
        const role = req.header("x-user-role");
        const email = req.header("x-user-email");
        if (!userId || !role) {
            req.auth = undefined;
            return next();
        }
        if (!ROLE_VALUES.has(role)) {
            return next(new errors_1.AppError("Invalid role", 401, "INVALID_ROLE"));
        }
        req.auth = { userId, role: role, email: email || undefined };
        return next();
    };
}
function requireAuth(allowedRoles) {
    return (req, _res, next) => {
        if (!req.auth)
            return next(new errors_1.AppError("Unauthorized", 401, "UNAUTHORIZED"));
        if (allowedRoles && !allowedRoles.includes(req.auth.role)) {
            return next(new errors_1.AppError("Forbidden", 403, "FORBIDDEN"));
        }
        return next();
    };
}
