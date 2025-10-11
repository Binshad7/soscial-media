import jswebToken from 'jsonwebtoken'
import { ENV } from '../../config/env_vars'
export const generateJwtToken = (userId: string, refreshToken: boolean = false) => {
    const expireAfterTime = refreshToken ? '7d' : "1d"
    const token = jswebToken.sign({ userId }, ENV.JWT_SECRET, { expiresIn: expireAfterTime });
    return token
}