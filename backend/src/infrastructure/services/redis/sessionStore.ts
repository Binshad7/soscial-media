import { hashToken } from "../../../shared/helpers/hashToken";
import { redisClient } from "./redis.Client";

export const storeUserSession = async (
    redisKey: string,
    _id: string,
    refreshToken: string,
    username: string,
    email: string
) => {
    const hashedRefreshToken = hashToken(refreshToken)
    const refreshKey = `refresh:${redisKey}`;
    const userKey = `user:${redisKey}`;

    await redisClient.set(refreshKey, hashedRefreshToken, { EX: 604800 }); // 7 days optional we can delete this 
    const userData = { _id, username, email };
    await redisClient.set(userKey, JSON.stringify(userData), { EX: 604800 }); // Optional: same as refresh
};

export const getUserSession = async (redisKey: string) => {
    const refreshToken = await redisClient.get(`refresh:${redisKey}`);
    const userData = await redisClient.get(`user:${redisKey}`);
    const user = userData ? JSON.parse(userData) : null;

    return { refreshToken, user };
};

export const deleteUserSession = async (redisKey: string) => {
    await redisClient.del(`refresh:${redisKey}`);
    await redisClient.del(`user:${redisKey}`);
};
