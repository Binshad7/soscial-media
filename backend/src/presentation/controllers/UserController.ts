import { NextFunction, Request, Response } from "express";
import { RegisterUser } from "../../application/usecases/user/RegisterUser";
import { LoginUser } from "../../application/usecases/user/LoginUser";
import { setAuthCookie } from "../helpers/cookieHelper";
import { COOKIE_VAR } from '../../constants/cookieVariable';
import { sendFollowRequest } from "../../application/usecases/user/sendFollowRequest";
import { AppError } from "../../domain/errors/AppError";
import { COMMON_MESSAGES } from "../../constants/messages/commonMessages";
import { HTTP_STATUS } from "../../constants/StatusCodes";
import { logger } from "../../shared/helpers/loger";

export class UserController {
    constructor(
        private registerUser: RegisterUser,
        private loginUser: LoginUser,
        private sendFollowReq: sendFollowRequest
    ) { }

    register = async (req: Request, res: Response, next: NextFunction) => {

        try {
            const { username, email, token, refreshToken, message } = await this.registerUser.execute(req.body);
            setAuthCookie(res, COOKIE_VAR.ACCESS_TOKEN, token, COOKIE_VAR.ACCESS_TOKEN_EXPIRE) // 1 day
            setAuthCookie(res, COOKIE_VAR.REFRESH_TOKEN, refreshToken, COOKIE_VAR.REFRESH_TOKEN_EXPIRE) // 7 day
            logger.info(message)
            res.status(HTTP_STATUS.CREATED).json({ message, username, email });
        } catch (error: any) {
            logger.error(error.message)
            next(error)
        }
    };

    login = async (req: Request, res: Response, next: NextFunction) => {

        try {
            const { username, email, token, refreshToken, message } = await this.loginUser.execute(req.body.email, req.body.password)
            setAuthCookie(res, COOKIE_VAR.ACCESS_TOKEN, token, COOKIE_VAR.ACCESS_TOKEN_EXPIRE)
            setAuthCookie(res, COOKIE_VAR.REFRESH_TOKEN, refreshToken, COOKIE_VAR.REFRESH_TOKEN_EXPIRE)
            logger.info(message)
            res.status(HTTP_STATUS.OK).json({ message, username, email });

        } catch (error: any) {
            logger.error(error.message)
            next(error)
        }
    }

    sendFollowRequest = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { reciverID } = req.params; // sending request to this user
            const senderId = req.user?._id
            const { message } = await this.sendFollowReq.execute(senderId, reciverID);
            logger.info(message)
            res.status(HTTP_STATUS.OK).json({ message })  // another one option insted of passing just a msg   we can send all friend rq friends
        } catch (error: any) {
            logger.error(error.message)
            next(error)
        }
    }
} 