import { Request, Response, NextFunction } from "express";
export type UserRole = "STUDENT" | "TEACHER" | "ADMIN" | "SYSTEM";
export type AuthContext = {
    userId: string;
    role: UserRole;
    email?: string;
};
export declare function authContext(): (req: Request, _res: Response, next: NextFunction) => void;
export declare function requireAuth(allowedRoles?: UserRole[]): (req: Request, _res: Response, next: NextFunction) => void;
