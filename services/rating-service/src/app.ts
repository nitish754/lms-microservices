import express from "express";
import routes from "./routes";
import { authContext } from "@lms/shared";

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(authContext());
  app.use(routes);
  return app;
}
