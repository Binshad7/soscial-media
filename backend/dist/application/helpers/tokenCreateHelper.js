"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTokenPair = void 0;
const jwtToken_1 = require("./jwtToken");
const createTokenPair = (redisKey) => {
    const token = (0, jwtToken_1.generateJwtToken)(redisKey);
    const refreshToken = (0, jwtToken_1.generateJwtToken)(redisKey, true);
    return { token, refreshToken };
};
exports.createTokenPair = createTokenPair;
