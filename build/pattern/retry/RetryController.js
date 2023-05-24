"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const Config_1 = require("../../Config");
const cockatiel_1 = require("cockatiel");
const BackendService_1 = __importDefault(require("../../BackendService"));
const routerRetry = (0, express_1.Router)();
routerRetry.use(body_parser_1.default.json());
const backendService = new BackendService_1.default();
function handleRequest(body) {
    const config = new Config_1.Config();
    config.maxRequests = body.maxRequests;
    config.successfulRequests = body.successfulRequests;
    config.targetUrl = body.targetUrl;
    return config;
}
function createPolicy(patternConfig) {
    return (0, cockatiel_1.retry)(cockatiel_1.handleAll, {
        backoff: new cockatiel_1.ExponentialBackoff({
            exponent: patternConfig.exponent,
            maxDelay: patternConfig.maxDelay,
            initialDelay: patternConfig.initialDelay,
        }),
        maxAttempts: patternConfig.maxAttempts
    });
}
routerRetry.post('/retry/', (req, res) => {
    const body = req.body;
    const config = handleRequest(body);
    const policy = createPolicy(body.patternParams);
    const result = backendService.makeRequest(config, policy);
    res.send(result);
});
exports.default = routerRetry;
//# sourceMappingURL=RetryController.js.map