import { Request, Response } from "express";
import { RegisterUser } from "../../application/usecases/user/RegisterUser";
import { LoginUser } from "../../application/usecases/user/LoginUser";
import { setAuthCookie } from "../helpers/cookieHelper";
import { COOKIE_VAR } from '../../constants/cookieVariable';

export class UserController {
    constructor(
        private registerUser: RegisterUser,
        private loginUser: LoginUser,
        private 
    ) { }

    register = async (req: Request, res: Response) => {
        const { username, email, token, refreshToken, message } = await this.registerUser.execute(req.body);
        setAuthCookie(res, COOKIE_VAR.ACCESS_TOKEN, token, COOKIE_VAR.ACCESS_TOKEN_EXPIRE) // 1 day
        setAuthCookie(res, COOKIE_VAR.REFRESH_TOKEN, refreshToken, COOKIE_VAR.REFRESH_TOKEN_EXPIRE) // 7 day
        res.status(201).json({ message, username, email });
    };

    login = async (req: Request, res: Response) => {
        const { username, email, token, refreshToken, message } = await this.loginUser.execute(req.body.email, req.body.password)
        setAuthCookie(res, COOKIE_VAR.ACCESS_TOKEN, token, COOKIE_VAR.ACCESS_TOKEN_EXPIRE)
        setAuthCookie(res, COOKIE_VAR.REFRESH_TOKEN, refreshToken, COOKIE_VAR.REFRESH_TOKEN_EXPIRE)
        res.status(200).json({ message, username, email });
    }

    sendFollowRequest = async (req: Request, res: Response) => {
        const { userId } = req.params;
        
    }
} 