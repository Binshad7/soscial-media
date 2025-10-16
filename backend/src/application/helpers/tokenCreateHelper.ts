import { generateJwtToken } from "./jwtToken";
export const createTokenPair = (redisKey: string) => {
    const token = generateJwtToken(redisKey);
    const refreshToken = generateJwtToken(redisKey, true)
    return { token, refreshToken }
}   