"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_vars_1 = require("./env_vars");
const loger_1 = require("../shared/helpers/loger");
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(env_vars_1.ENV.MONGO_URL);
        loger_1.logger.info("MongoDB connected");
    }
    catch (error) {
        loger_1.logger.error("MongoDB connection error:");
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
