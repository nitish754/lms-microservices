import express from "express";
import routes from "./routes";
import { errorHandler } from "./utils/error-handler";
import { authContext } from "@lms/shared";

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(authContext());
  app.use(routes);
  app.use(errorHandler);
  return app;
}
