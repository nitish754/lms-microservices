"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const shared_1 = require("@lms/shared");
function createApp() {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, shared_1.authContext)());
    app.use(routes_1.default);
    return app;
}
