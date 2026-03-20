import { Request, Response, NextFunction } from "express";
import { AppError } from "./errors";

export type UserRole = "STUDENT" | "TEACHER" | "ADMIN" | "SYSTEM";

export type AuthContext = {
  userId: string;
  role: UserRole;
  email?: string;
};

const ROLE_VALUES = new Set<UserRole>(["STUDENT", "TEACHER", "ADMIN", "SYSTEM"]);

export function authContext() {
  return (req: Request, _res: Response, next: NextFunction) => {
    const userId = req.header("x-user-id");
    const role = req.header("x-user-role");
    const email = req.header("x-user-email");

    if (!userId || !role) {
      req.auth = undefined;
      return next();
    }

    if (!ROLE_VALUES.has(role as UserRole)) {
      return next(new AppError("Invalid role", 401, "INVALID_ROLE"));
    }

    req.auth = { userId, role: role as UserRole, email: email || undefined };
    return next();
  };
}

export function requireAuth(allowedRoles?: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.auth) return next(new AppError("Unauthorized", 401, "UNAUTHORIZED"));
    if (allowedRoles && !allowedRoles.includes(req.auth.role)) {
      return next(new AppError("Forbidden", 403, "FORBIDDEN"));
    }
    return next();
  };
}
