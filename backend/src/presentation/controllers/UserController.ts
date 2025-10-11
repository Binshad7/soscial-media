import { Request, Response } from "express";
import { RegisterUser } from "../../application/usecases/user/RegisterUser";
import { LoginUser } from "../../application/usecases/user/LoginUser";
import { setAuthCookie } from "../helpers/cookieHelper";
export class UserController {
    constructor(
        private registerUser: RegisterUser,
        private loginUser: LoginUser
    ) { }

    register = async (req: Request, res: Response) => {
            const { username, email, token, message } = await this.registerUser.execute(req.body);
            setAuthCookie(res, token)
            res.status(201).json({ message, username, email });
    };

    login = async (req: Request, res: Response) => {
            const { username, email, token, message } = await this.loginUser.execute(req.body.email, req.body.password)
            setAuthCookie(res, token)
            res.status(200).json({ message, username, email });
    }
} 