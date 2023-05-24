"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts_stopwatch_1 = require("ts-stopwatch");
const axios_1 = __importDefault(require("axios"));
const ResillienceModuleMetrics_1 = require("./ResillienceModuleMetrics");
class BackendService {
    makeRequest(config, policy) {
        return __awaiter(this, void 0, void 0, function* () {
            let successulCalls = 0;
            let totalCalls = 0;
            const metrics = new ResillienceModuleMetrics_1.ResillienceModuleMetrics();
            const externalStopwatch = new ts_stopwatch_1.Stopwatch();
            const requestStopwatch = new ts_stopwatch_1.Stopwatch();
            policy.onSuccess(() => {
                successulCalls++;
            });
            externalStopwatch.start();
            while (successulCalls < config.successfulRequests && config.maxRequests > metrics.getTotalRequests()) {
                requestStopwatch.reset();
                requestStopwatch.start();
                yield policy.execute(() => axios_1.default.get(config.targetUrl)
                    .then(() => {
                    requestStopwatch.stop();
                    metrics.registerSuccess(requestStopwatch.getTime());
                })
                    .catch(() => {
                    requestStopwatch.stop();
                    metrics.registerError(requestStopwatch.getTime());
                }));
                totalCalls++;
            }
            externalStopwatch.stop();
            metrics.registerTotals(totalCalls, successulCalls, externalStopwatch.getTime());
            return metrics;
        });
    }
}
exports.default = BackendService;
//# sourceMappingURL=BackendService.js.map