import { createLogger } from "@lms/shared";
import "dotenv/config";
import { createApp } from "./app";

const serviceName = process.env.SERVICE_NAME || "notification-service";
const port = Number(process.env.PORT) || 0;

const logger = createLogger(serviceName);
const app = createApp();

app.listen(port, () => {
  logger.info(`listening on ${port}`);
});
