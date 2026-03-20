"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHealth = getHealth;
const health_service_1 = require("../services/health.service");
const health_repository_1 = require("../repositories/health.repository");
const service = new health_service_1.HealthService(new health_repository_1.HealthRepository());
async function getHealth(_req, res) {
    const result = await service.ping();
    res.json(result);
}
