"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = exports.authContext = exports.AppError = void 0;
exports.createLogger = createLogger;
function createLogger(serviceName) {
    return {
        info: (msg, meta) => console.log(JSON.stringify({ level: "info", service: serviceName, msg, meta })),
        warn: (msg, meta) => console.warn(JSON.stringify({ level: "warn", service: serviceName, msg, meta })),
        error: (msg, meta) => console.error(JSON.stringify({ level: "error", service: serviceName, msg, meta }))
    };
}
var errors_1 = require("./errors");
Object.defineProperty(exports, "AppError", { enumerable: true, get: function () { return errors_1.AppError; } });
var auth_1 = require("./auth");
Object.defineProperty(exports, "authContext", { enumerable: true, get: function () { return auth_1.authContext; } });
Object.defineProperty(exports, "requireAuth", { enumerable: true, get: function () { return auth_1.requireAuth; } });
