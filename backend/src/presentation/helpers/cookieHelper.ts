import { Response } from "express";
import { ENV } from "../../config/env_vars";

export const setAuthCookie = (res: Response, tokenType: string, token: string, maxAge: number) => {
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
