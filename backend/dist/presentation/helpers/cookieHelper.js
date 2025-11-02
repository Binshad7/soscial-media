"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthCookie = void 0;
const env_vars_1 = require("../../config/env_vars");
const cookieVariable_1 = require("../../constants/cookieVariable");
const setAuthCookie = async (res, token, refreshToken) => {
    setHelperCookie(res, cookieVariable_1.COOKIE_VAR.ACCESS_TOKEN, token, cookieVariable_1.COOKIE_VAR.ACCESS_TOKEN_EXPIRE);
    setHelperCookie(res, cookieVariable_1.COOKIE_VAR.REFRESH_TOKEN, refreshToken, cookieVariable_1.COOKIE_VAR.REFRESH_TOKEN_EXPIRE);
};
exports.setAuthCookie = setAuthCookie;
const setHelperCookie = (res, tokenType, token, maxAge) => {
    const isProd = env_vars_1.ENV.NODE_ENV === "production";
    const configuredSameSite = env_vars_1.ENV.COOKIE_SAMESITE;
    const sameSite = configuredSameSite ?? (isProd ? "none" : "lax");
    const secure = isProd || sameSite === "none";
    res.cookie(tokenType, token, {
        maxAge: maxAge * 1000,
        httpOnly: true,
        sameSite,
        secure
    });
};
