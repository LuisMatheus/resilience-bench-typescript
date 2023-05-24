"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const cockatiel_1 = require("cockatiel");
const Config_1 = require("../../Config");
const BackendService_1 = __importDefault(require("../../BackendService"));
const routerCircuitBreaker = (0, express_1.Router)();
routerCircuitBreaker.use(body_parser_1.default.json());
const backendService = new BackendService_1.default();
function handleRequest(body) {
    const config = new Config_1.Config();
    config.maxRequests = body.maxRequests;
    config.successfulRequests = body.successfulRequests;
    config.targetUrl = body.targetUrl;
    return config;
}
function createPolicyConsecutive(patternConfig) {
    return (0, cockatiel_1.circuitBreaker)(cockatiel_1.handleAll, {
        halfOpenAfter: patternConfig.halfOpenAfter,
        breaker: new cockatiel_1.ConsecutiveBreaker(patternConfig.exceptionsAllowedBeforeBreaking),
    });
}
routerCircuitBreaker.post('/circuitbreaker/consecutive/', (req, res) => {
    const body = req.body;
    const config = handleRequest(body);
    const policy = createPolicyConsecutive(body.patternParams);
    const result = backendService.makeRequest(config, policy);
    res.send(result);
});
function createPolicySample(patternConfig) {
    return (0, cockatiel_1.circuitBreaker)(cockatiel_1.handleAll, {
        halfOpenAfter: patternConfig.halfOpenAfter,
        breaker: new cockatiel_1.SamplingBreaker({
            threshold: patternConfig.threshold,
            duration: patternConfig.duration,
            minimumRps: patternConfig.minimumRps,
        }),
    });
}
routerCircuitBreaker.post('/circuitbreaker/sampling/', (req, res) => {
    const body = req.body;
    const config = handleRequest(body);
    const policy = createPolicySample(body.patternParams);
    const result = backendService.makeRequest(config, policy);
    res.send(result);
});
exports.default = routerCircuitBreaker;
//# sourceMappingURL=CircuitBreakerController.js.map