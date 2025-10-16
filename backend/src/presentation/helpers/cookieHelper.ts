import { Response } from "express";
import { ENV } from "../../config/env_vars";

export const setAuthCookie = (res: Response, tokenType: string, token: string, maxAge: number) => {
    res.cookie(tokenType, token, {
        maxAge: maxAge * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: ENV.NODE_ENV === "production"
    });
};
