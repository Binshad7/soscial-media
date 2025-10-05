import { Request, Response } from "express";
import { RegisterUser } from "../../application/usecases/user/RegisterUser";
import { LoginUser } from "../../application/usecases/user/LoginUser";

export class UserController {
    constructor(
        private registerUser: RegisterUser,
        private loginUser: LoginUser
    ) { }

    register = async (req: Request, res: Response) => {
        try {
            const user = await this.registerUser.execute(req.body);
            res.status(201).json(user);
        } catch (e: any) {
            res.status(400).json({ error: e.message });
        }
    };

    login = async (req: Request, res: Response) => {
        try {
            const user = await this.loginUser.execute(req.body.email, req.body.password)
            res.status(200).json(user);
        } catch (error: any) {
            res.status(500).json({ error: error.message })
        }
    }


}