"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResillienceModuleMetrics = void 0;
class ResillienceModuleMetrics {
    constructor() {
        this.successfulCalls = 0;
        this.unsuccessfulCalls = 0;
        this.successfulRequests = 0;
        this.unsuccessfulRequests = 0;
        this.successTime = 0;
        this.errorTime = 0;
        this.totalExecutionTime = 0;
    }
    getSuccessfulCalls() {
        return this.successfulCalls;
    }
    getUnsuccessfulCalls() {
        return this.unsuccessfulCalls;
    }
    getTotalCalls() {
        return this.getSuccessfulCalls() + this.getUnsuccessfulCalls();
    }
    getSuccessfulRequests() {
        return this.successfulRequests;
    }
    getUnsuccessfulRequests() {
        return this.unsuccessfulRequests;
    }
    getSuccessTime() {
        return this.successTime;
    }
    getSuccessTimePerRequest() {
        if (this.successfulRequests > 0) {
            return this.successTime / this.successfulRequests;
        }
        else {
            return 0;
        }
    }
    getErrorTime() {
        return this.errorTime;
    }
    getErrorTimePerRequest() {
        if (this.unsuccessfulRequests > 0) {
            return this.errorTime / this.unsuccessfulRequests;
        }
        else {
            return 0;
        }
    }
    getThroughput() {
        if (this.totalExecutionTime > 0) {
            return (1000 * this.getTotalRequests()) / this.totalExecutionTime;
        }
        else {
            return 0;
        }
    }
    getTotalExecutionTime() {
        return this.totalExecutionTime;
    }
    getTotalContentionTime() {
        return this.successTime + this.errorTime;
    }
    getContentionRate() {
        if (this.totalExecutionTime > 0) {
            return this.getTotalContentionTime() / this.totalExecutionTime;
        }
        else {
            return 0;
        }
    }
    getTotalRequests() {
        return this.successfulRequests + this.unsuccessfulRequests;
    }
    registerSuccess(elapsedTime) {
        this.successfulRequests++;
        this.successTime += elapsedTime;
    }
    registerError(elapsedTime) {
        this.unsuccessfulRequests++;
        this.errorTime += elapsedTime;
    }
    registerTotals(totalCalls, successfulCalls, totalExecutionTime) {
        this.successfulCalls = successfulCalls;
        this.unsuccessfulCalls = totalCalls - this.successfulCalls;
        this.totalExecutionTime = totalExecutionTime;
    }
}
exports.ResillienceModuleMetrics = ResillienceModuleMetrics;
//# sourceMappingURL=ResillienceModuleMetrics.js.map