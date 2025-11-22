import { NextFunction, Request, Response } from "express";
import { RegisterUserUseCase } from "../../application/usecases/user/RegisterUserUseCase";
import { LoginUserUseCase } from "../../application/usecases/user/LoginUserUseCase";
import { setAuthCookie } from "../helpers/cookieHelper";
import { SendFollowRequestUseCase } from "../../application/usecases/user/SendFollowRequestUseCase";
import { AccepttFollowRequestUseCase } from "../../application/usecases/user/AcceptFollowRequestUseCase";
import { RejectFollowRequestUseCase } from "../../application/usecases/user/RejectFollowRequestUseCase";
import { logger } from "../../shared/utils/loger";
import { authSuccess, loginSuccess, registerSuccess, success } from "../helpers/response";


export class UserController {
    constructor(
        private readonly _registerUserUseCase: RegisterUserUseCase,
        private readonly _loginUserUseCase: LoginUserUseCase,
        private readonly _sendFollowReqUseCase: SendFollowRequestUseCase,
        private readonly _acceptFollowReqUseCase: AccepttFollowRequestUseCase,
        private readonly _rejecttFollowReqUseCase: RejectFollowRequestUseCase

    ) { }

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, email, accessToken, refreshToken } = await this._registerUserUseCase.execute(req.body);
            setAuthCookie(res, accessToken, refreshToken);
            logger.info(`Registration successful for user: ${username}`, { requestId: req.requestId });
            return registerSuccess(res, { username, email });
        } catch (error: any) {
            logger.error(`Registration failed: ${error.message}`, { requestId: req.requestId });
            next(error);
        }
    };

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, email, accessToken, refreshToken } = await this._loginUserUseCase.execute(req.body.email, req.body.password);
            setAuthCookie(res, accessToken, refreshToken);
            logger.info(`Login successful for user: ${username}`, { requestId: req.requestId });
            return loginSuccess(res, { username, email });
        } catch (error: any) {
            logger.error(`Login failed: ${error.message}`, { requestId: req.requestId });
            next(error);
        }
    }

    userValidCheck = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user;
            authSuccess(res, user);
        } catch (error: any) {
            next(error)
        }
    }

    sendFollowRequest = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { receiverId } = req.params; // sending request to this user
            const senderId = req.user?._id;
            const { message } = await this._sendFollowReqUseCase.execute(senderId, receiverId);
            logger.info(`Follow request sent: ${message}`, { requestId: req.requestId, senderId, receiverId: receiverId });
            return success(res, message,);
        } catch (error: any) {
            logger.error(`Follow request failed: ${error.message}`, { requestId: req.requestId });
            next(error);
        }
    }

    acceptFollowRequest = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { receiverId } = req.params; // accept request to this user
            const senderId = req.user?._id;
            const message = await this._acceptFollowReqUseCase.execute(senderId, receiverId);
            logger.info(`Follow request sent: ${message}`, { requestId: req.requestId, senderId, receiverId });
            return success(res, { message });
        } catch (error: any) {
            logger.error(`Follow request failed: ${error.message}`, { requestId: req.requestId });
            next(error);
        }
    }

    rejectFollowRequest = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { receiverId } = req.params; // reject request to this user
            const senderId = req.user?._id || '';
            const message = await this._rejecttFollowReqUseCase.execute(senderId, receiverId);
            logger.info(`Follow request sent: ${message}`, { requestId: req.requestId, senderId, receiverId });
            return success(res, { message }, "Follow request sent successfully");
        } catch (error: any) {
            logger.error(`Follow request failed: ${error.message}`, { requestId: req.requestId });
            next(error);
        }
    }
} 