"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthService = void 0;
class HealthService {
    constructor(repo) {
        this.repo = repo;
    }
    async ping() {
        await this.repo.ping();
        return { status: "ok" };
    }
}
exports.HealthService = HealthService;
