export declare function createLogger(serviceName: string): {
    info: (msg: string, meta?: unknown) => void;
    warn: (msg: string, meta?: unknown) => void;
    error: (msg: string, meta?: unknown) => void;
};
export { AppError } from "./errors";
export { authContext, requireAuth } from "./auth";
export type { AuthContext, UserRole } from "./auth";
