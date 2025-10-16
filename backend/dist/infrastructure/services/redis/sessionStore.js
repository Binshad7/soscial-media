"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserSession = exports.getUserSession = exports.storeUserSession = void 0;
const redis_Client_1 = require("./redis.Client");
const storeUserSession = async (redisKey, userId, refreshToken, username, email) => {
    const refreshKey = `refresh:${redisKey}`;
    const userKey = `user:${redisKey}`;
    await redis_Client_1.redisClient.set(refreshKey, refreshToken, { EX: 604800 }); // 7 days optional we can delete this 
    const userData = { userId, username, email };
    await redis_Client_1.redisClient.set(userKey, JSON.stringify(userData), { EX: 604800 }); // Optional: same as refresh
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
