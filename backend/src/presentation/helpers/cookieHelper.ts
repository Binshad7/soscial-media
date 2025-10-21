import { Response } from "express";
import { ENV } from "../../config/env_vars";
import { COOKIE_VAR } from "../../constants/cookieVariable";


export const setAuthCookie = async (res: Response, token: string, refreshToken: string) => {
    setHelperCookie(res, COOKIE_VAR.ACCESS_TOKEN, token, COOKIE_VAR.ACCESS_TOKEN_EXPIRE);
    setHelperCookie(res, COOKIE_VAR.REFRESH_TOKEN, refreshToken, COOKIE_VAR.REFRESH_TOKEN_EXPIRE);
}

const setHelperCookie = (res: Response, tokenType: string, token: string, maxAge: number) => {
    const isProd = ENV.NODE_ENV === "production";
    const configuredSameSite = (ENV.COOKIE_SAMESITE as any) as "lax" | "strict" | "none" | undefined;
    const sameSite = configuredSameSite ?? (isProd ? "none" : "lax");
    const secure = isProd || sameSite === "none";
    res.cookie(tokenType, token, {
        maxAge: maxAge * 1000,
        httpOnly: true,
        sameSite,
        secure
    });
};
