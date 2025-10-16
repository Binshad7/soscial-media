"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_vars_1 = require("../../config/env_vars");
const verifyToken = async (token) => {
    const decoded = jsonwebtoken_1.default.verify(token, env_vars_1.ENV.JWT_SECRET);
    return decoded;
};
exports.verifyToken = verifyToken;
