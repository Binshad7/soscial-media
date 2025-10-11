import { Response } from "express";
import { ENV } from "../../config/env_vars";

export const setAuthCookie = (res: Response, token: string) => {
    res.cookie("chatApplication", token, {
        maxAge: 86400 * 1000, // 1 day
        httpOnly: true,
        sameSite: "strict",
        secure: ENV.NODE_ENV === "production"
    });
};
