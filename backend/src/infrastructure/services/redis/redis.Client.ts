import { createClient } from 'redis';
import { REDIS_CONFIG } from '../../../config/redis';

export const redisClient = createClient({
    username: REDIS_CONFIG.REDIS_USERNAME,
    password: REDIS_CONFIG.REDIS_PASS,
    socket: {
        host: REDIS_CONFIG.REDIS_HOST,
        port: REDIS_CONFIG.REDIS_PORT
    }
});

redisClient.on('error', err => {
    console.error('Redis client error:', err);
})

export const connectRedis = async () => {
    if (!redisClient.isOpen) {
        await redisClient.connect()
        console.log("Redis Connected")
    }
}
