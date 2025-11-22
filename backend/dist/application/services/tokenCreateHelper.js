"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTokenPair = void 0;
const jwtToken_1 = require("./jwtToken");
const uuid_1 = require("uuid");
const createTokenPair = () => {
    const redisKey = (0, uuid_1.v4)();
    const accessToken = (0, jwtToken_1.generateJwtToken)(redisKey);
    const refreshToken = (0, jwtToken_1.generateJwtToken)(redisKey, true);
    return { accessToken, refreshToken, redisKey };
};
exports.createTokenPair = createTokenPair;
