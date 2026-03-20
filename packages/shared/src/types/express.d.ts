import "express-serve-static-core";
import type { AuthContext } from "../auth";

declare module "express-serve-static-core" {
  interface Request {
    auth?: AuthContext;
  }
}
