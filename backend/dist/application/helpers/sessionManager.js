"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionManager = void 0;
const sessionStore_1 = require("../../infrastructure/services/redis/sessionStore");
const tokenCreateHelper_1 = require("./tokenCreateHelper");
const sessionManager = async (user) => {
    const { accessToken, redisKey, refreshToken } = (0, tokenCreateHelper_1.createTokenPair)();
    await (0, sessionStore_1.storeUserSession)(redisKey, user._id, refreshToken, user.username, user.email);
    return { accessToken, refreshToken };
};
exports.sessionManager = sessionManager;
