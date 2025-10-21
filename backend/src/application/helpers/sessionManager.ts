import { sessionUser } from "../../domain/entities/User";
import { storeUserSession } from "../../infrastructure/services/redis/sessionStore";
import { createTokenPair } from "./tokenCreateHelper";

export const sessionManager = async (user: sessionUser): Promise<{ accessToken: string, refreshToken: string }> => {
    const { accessToken, redisKey, refreshToken } = createTokenPair();
    await storeUserSession(redisKey, user._id, refreshToken, user.username, user.email)
    return { accessToken, refreshToken }
}