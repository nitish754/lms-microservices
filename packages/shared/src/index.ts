export function createLogger(serviceName: string) {
  return {
    info: (msg: string, meta?: unknown) =>
      console.log(JSON.stringify({ level: "info", service: serviceName, msg, meta })),
    warn: (msg: string, meta?: unknown) =>
      console.warn(JSON.stringify({ level: "warn", service: serviceName, msg, meta })),
    error: (msg: string, meta?: unknown) =>
      console.error(JSON.stringify({ level: "error", service: serviceName, msg, meta }))
  };
}

export { AppError } from "./errors";
export { authContext, requireAuth } from "./auth";
export type { AuthContext, UserRole } from "./auth";
