"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const cookieHelper_1 = require("../helpers/cookieHelper");
const cookieVariable_1 = require("../../constants/cookieVariable");
class UserController {
    constructor(registerUser, loginUser) {
        this.registerUser = registerUser;
        this.loginUser = loginUser;
        this.register = async (req, res) => {
            const { username, email, token, refreshToken, message } = await this.registerUser.execute(req.body);
            (0, cookieHelper_1.setAuthCookie)(res, cookieVariable_1.COOKIE_VAR.ACCESS_TOKEN, token, cookieVariable_1.COOKIE_VAR.ACCESS_TOKEN_EXPIRE); // 1 day
            (0, cookieHelper_1.setAuthCookie)(res, cookieVariable_1.COOKIE_VAR.REFRESH_TOKEN, refreshToken, cookieVariable_1.COOKIE_VAR.REFRESH_TOKEN_EXPIRE); // 7 day
            res.status(201).json({ message, username, email });
        };
        this.login = async (req, res) => {
            const { username, email, token, refreshToken, message } = await this.loginUser.execute(req.body.email, req.body.password);
            (0, cookieHelper_1.setAuthCookie)(res, cookieVariable_1.COOKIE_VAR.ACCESS_TOKEN, token, cookieVariable_1.COOKIE_VAR.ACCESS_TOKEN_EXPIRE); // 1 day
            (0, cookieHelper_1.setAuthCookie)(res, cookieVariable_1.COOKIE_VAR.REFRESH_TOKEN, refreshToken, cookieVariable_1.COOKIE_VAR.REFRESH_TOKEN_EXPIRE); // 7 day
            res.status(200).json({ message, username, email });
        };
    }
}
exports.UserController = UserController;
