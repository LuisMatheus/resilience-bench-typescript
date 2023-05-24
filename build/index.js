"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const BaselineController_1 = __importDefault(require("./baseline/BaselineController"));
const RetryController_1 = __importDefault(require("./pattern/retry/RetryController"));
const CircuitBreakerController_1 = __importDefault(require("./pattern/circuitBreaker/CircuitBreakerController"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use('/', BaselineController_1.default);
app.use('/', RetryController_1.default);
app.use('/', CircuitBreakerController_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
//# sourceMappingURL=index.js.map