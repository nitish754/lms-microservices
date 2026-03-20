const express = require("express");
const { createLogger } = require("@lms/shared");
require("dotenv").config();

const serviceName = process.env.SERVICE_NAME || "notification-service";
const port = Number(process.env.PORT) || 0;

const app = express();
const logger = createLogger(serviceName);

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: serviceName });
});

app.listen(port, () => {
  logger.info(`listening on ${port}`);
});
