"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserSession = exports.getUserSession = exports.storeUserSession = void 0;
const hashToken_1 = require("../../../shared/helpers/hashToken");
const redis_Client_1 = require("../../../config/redis.Client");
const storeUserSession = async (redisKey, _id, refreshToken, username, email) => {
    const hashedRefreshToken = (0, hashToken_1.hashToken)(refreshToken);
    const refreshKey = `refresh:${redisKey}`;
    const userKey = `user:${redisKey}`;
    await redis_Client_1.redisClient.set(refreshKey, hashedRefreshToken, { EX: 604800 }); // 7 days optional we can delete this 
    const userData = { _id, username, email };
    await redis_Client_1.redisClient.set(userKey, JSON.stringify(userData), { EX: 604800 }); //  same as refresh
};
exports.storeUserSession = storeUserSession;
const getUserSession = async (redisKey) => {
    const refreshToken = await redis_Client_1.redisClient.get(`refresh:${redisKey}`);
    const userData = await redis_Client_1.redisClient.get(`user:${redisKey}`);
    const user = userData ? JSON.parse(userData) : null;
    return { refreshToken, user };
};
exports.getUserSession = getUserSession;
const deleteUserSession = async (redisKey) => {
    await redis_Client_1.redisClient.del(`refresh:${redisKey}`);
    await redis_Client_1.redisClient.del(`user:${redisKey}`);
};
exports.deleteUserSession = deleteUserSession;
