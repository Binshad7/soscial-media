import { generateJwtToken } from "./jwtToken";
export const createTokenPair = (_id: string) => {
    const token = generateJwtToken(_id);
    const refreshToken = generateJwtToken(_id, true)
    return { token, refreshToken }
}