import { generateJwtToken } from "./jwtToken";
import { v4 as uuid } from 'uuid'
export const createTokenPair = () => {

    const redisKey = uuid()
    const accessToken = generateJwtToken(redisKey);
    const refreshToken = generateJwtToken(redisKey, true)
    return { accessToken, refreshToken, redisKey }
}   