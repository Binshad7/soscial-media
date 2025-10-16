"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectRedis = exports.redisClient = void 0;
const redis_1 = require("redis");
const redis_2 = require("../../../config/redis");
exports.redisClient = (0, redis_1.createClient)({
    username: redis_2.REDIS_CONFIG.REDIS_USERNAME,
    password: redis_2.REDIS_CONFIG.REDIS_PASS,
    socket: {
        host: redis_2.REDIS_CONFIG.REDIS_HOST,
        port: redis_2.REDIS_CONFIG.REDIS_PORT
    }
});
exports.redisClient.on('error', err => {
    console.error('Redis client error:', err);
});
const connectRedis = async () => {
    if (!exports.redisClient.isOpen) {
        await exports.redisClient.connect();
        console.log("Redis Connected");
    }
};
exports.connectRedis = connectRedis;
