"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_vars_1 = require("../../config/env_vars");
const generateJwtToken = (redisKey, refreshToken = false) => {
    const expireAfterTime = refreshToken ? '7d' : "12h";
    const token = jsonwebtoken_1.default.sign({ redisKey }, env_vars_1.ENV.JWT_SECRET, { expiresIn: expireAfterTime });
    return token;
};
exports.generateJwtToken = generateJwtToken;
