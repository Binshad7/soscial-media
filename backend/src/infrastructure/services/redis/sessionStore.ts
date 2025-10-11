import { redisClient } from "./redis.Client";

export const storeUserSession = async (
    userId: string,
    accessToken: string,
    refreshToken: string,
    username: string,
    email: string
) => {
    const accessKey = `access:${userId}`;
    const refreshKey = `refresh:${userId}`;
    const userKey = `user:${userId}`;

    await redisClient.set(accessKey, accessToken, { EX: 86400 }); // 1 hour
    await redisClient.set(refreshKey, refreshToken, { EX: 604800 }); // 7 days

    const userData = { username, email };
    await redisClient.set(userKey, JSON.stringify(userData), { EX: 604800 }); // Optional: same as refresh
};

export const getUserSession = async (userId: string) => {
    const accessToken = await redisClient.get(`access:${userId}`);
    const refreshToken = await redisClient.get(`refresh:${userId}`);
    const userData = await redisClient.get(`user:${userId}`);
    const user = userData ? JSON.parse(userData) : null;

    return { accessToken, refreshToken, user };
};

export const deleteUserSession = async (userId: string) => {
    await redisClient.del(`access:${userId}`);
    await redisClient.del(`refresh:${userId}`);
    await redisClient.del(`user:${userId}`);
};
