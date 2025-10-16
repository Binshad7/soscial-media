import jswebToken from 'jsonwebtoken'
import { ENV } from '../../config/env_vars'
export const generateJwtToken = (redisKey: string, refreshToken: boolean = false) => {
    const expireAfterTime = refreshToken ? '7d' : "12h"
    const token = jswebToken.sign({ redisKey }, ENV.JWT_SECRET, { expiresIn: expireAfterTime });
    return token
}   