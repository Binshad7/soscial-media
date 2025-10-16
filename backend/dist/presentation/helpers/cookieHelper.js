"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthCookie = void 0;
const env_vars_1 = require("../../config/env_vars");
const setAuthCookie = (res, tokenType, token, maxAge) => {
    res.cookie(tokenType, token, {
        maxAge: maxAge * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: env_vars_1.ENV.NODE_ENV === "production"
    });
};
exports.setAuthCookie = setAuthCookie;
