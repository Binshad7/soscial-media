import { NextFunction, Request, Response } from "express";
import { RegisterUser } from "../../application/usecases/user/RegisterUser";
import { LoginUser } from "../../application/usecases/user/LoginUser";
import { setAuthCookie } from "../helpers/cookieHelper";
import { sendFollowRequest } from "../../application/usecases/user/sendFollowRequest";
import { AccepttFollowRequest } from "../../application/usecases/user/acceptFollowRequest";
import { RejectFollowRequest } from "../../application/usecases/user/RejectFollowRequest";
import { logger } from "../../shared/helpers/loger";
import { authSuccess, registerSuccess, success } from "../helpers/response";

export class UserController {
    constructor(
        private registerUser: RegisterUser,
        private loginUser: LoginUser,
        private sendFollowReq: sendFollowRequest,
        private acceptFollowReq: AccepttFollowRequest,
        private rejecttFollowReq: RejectFollowRequest

    ) { }

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, email, accessToken, refreshToken } = await this.registerUser.execute(req.body);
            setAuthCookie(res, accessToken, refreshToken);
            logger.info(`Registration successful for user: ${username}`, { requestId: req.requestId });
            return registerSuccess(res, { username, email }, { accessToken, refreshToken });
        } catch (error: any) {
            logger.error(`Registration failed: ${error.message}`, { requestId: req.requestId });
            next(error);
        }
    };

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, email, accessToken, refreshToken } = await this.loginUser.execute(req.body.email, req.body.password);
            setAuthCookie(res, accessToken, refreshToken);
            logger.info(`Login successful for user: ${username}`, { requestId: req.requestId });
            return authSuccess(res, { username, email });
        } catch (error: any) {
            logger.error(`Login failed: ${error.message}`, { requestId: req.requestId });
            next(error);
        }
    }

    sendFollowRequest = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { receiverId } = req.params; // sending request to this user
            const senderId = req.user?._id;
            const { message } = await this.sendFollowReq.execute(senderId, receiverId);
            logger.info(`Follow request sent: ${message}`, { requestId: req.requestId, senderId, receiverId: receiverId });
            return success(res, { message }, "Follow request sent successfully");
        } catch (error: any) {
            logger.error(`Follow request failed: ${error.message}`, { requestId: req.requestId });
            next(error);
        }
    }

    acceptFollowRequest = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { receiverId } = req.params; // accept request to this user
            const senderId = req.user?._id;
            const message = await this.acceptFollowReq.execute(senderId, receiverId);
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
            const message = await this.rejecttFollowReq.execute(senderId, receiverId);
            logger.info(`Follow request sent: ${message}`, { requestId: req.requestId, senderId, receiverId });
            return success(res, { message }, "Follow request sent successfully");
        } catch (error: any) {
            logger.error(`Follow request failed: ${error.message}`, { requestId: req.requestId });
            next(error);
        }
    }
} 