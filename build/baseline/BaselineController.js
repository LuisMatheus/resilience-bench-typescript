"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const Config_1 = require("../Config");
const cockatiel_1 = require("cockatiel");
const BackendService_1 = __importDefault(require("../BackendService"));
const routerBaseline = (0, express_1.Router)();
routerBaseline.use(body_parser_1.default.json());
const backendService = new BackendService_1.default();
function handleRequest(req) {
    const body = req.body;
    const config = new Config_1.Config();
    config.maxRequests = body.maxRequests;
    config.successfulRequests = body.successfulRequests;
    config.targetUrl = body.targetUrl;
    return config;
}
routerBaseline.post('/baseline/', (req, res) => {
    const config = handleRequest(req);
    const policy = new cockatiel_1.NoopPolicy();
    const result = backendService.makeRequest(config, policy);
    res.send(result);
});
exports.default = routerBaseline;
//# sourceMappingURL=BaselineController.js.map