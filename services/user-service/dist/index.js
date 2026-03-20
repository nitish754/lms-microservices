"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("@lms/shared");
require("dotenv/config");
const app_1 = require("./app");
const serviceName = process.env.SERVICE_NAME || "user-service";
const port = Number(process.env.PORT) || 0;
const logger = (0, shared_1.createLogger)(serviceName);
const app = (0, app_1.createApp)();
app.listen(port, () => {
    logger.info(`listening on ${port}`);
});
