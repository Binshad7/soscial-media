"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const connectDB_1 = require("./config/connectDB");
const env_vars_1 = require("./config/env_vars");
const redis_Client_1 = require("./config/redis.Client");
const loger_1 = require("./shared/helpers/loger");
app_1.default.listen(env_vars_1.ENV.PORT, () => {
    (0, connectDB_1.connectDB)();
    (0, redis_Client_1.connectRedis)();
    loger_1.logger.info("server running ");
});
