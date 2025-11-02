"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const cookieHelper_1 = require("../helpers/cookieHelper");
const loger_1 = require("../../shared/helpers/loger");
const response_1 = require("../helpers/response");
class UserController {
    constructor(registerUser, loginUser, sendFollowReq, acceptFollowReq, rejecttFollowReq) {
        this.registerUser = registerUser;
        this.loginUser = loginUser;
        this.sendFollowReq = sendFollowReq;
        this.acceptFollowReq = acceptFollowReq;
        this.rejecttFollowReq = rejecttFollowReq;
        this.register = async (req, res, next) => {
            try {
                const { username, email, accessToken, refreshToken } = await this.registerUser.execute(req.body);
                (0, cookieHelper_1.setAuthCookie)(res, accessToken, refreshToken);
                loger_1.logger.info(`Registration successful for user: ${username}`, { requestId: req.requestId });
                return (0, response_1.registerSuccess)(res, { username, email }, { accessToken, refreshToken });
            }
            catch (error) {
                loger_1.logger.error(`Registration failed: ${error.message}`, { requestId: req.requestId });
                next(error);
            }
        };
        this.login = async (req, res, next) => {
            try {
                const { username, email, accessToken, refreshToken } = await this.loginUser.execute(req.body.email, req.body.password);
                (0, cookieHelper_1.setAuthCookie)(res, accessToken, refreshToken);
                loger_1.logger.info(`Login successful for user: ${username}`, { requestId: req.requestId });
                return (0, response_1.authSuccess)(res, { username, email });
            }
            catch (error) {
                loger_1.logger.error(`Login failed: ${error.message}`, { requestId: req.requestId });
                next(error);
            }
        };
        this.sendFollowRequest = async (req, res, next) => {
            try {
                const { receiverId } = req.params; // sending request to this user
                const senderId = req.user?._id;
                const { message } = await this.sendFollowReq.execute(senderId, receiverId);
                loger_1.logger.info(`Follow request sent: ${message}`, { requestId: req.requestId, senderId, receiverId: receiverId });
                return (0, response_1.success)(res, { message }, "Follow request sent successfully");
            }
            catch (error) {
                loger_1.logger.error(`Follow request failed: ${error.message}`, { requestId: req.requestId });
                next(error);
            }
        };
        this.acceptFollowRequest = async (req, res, next) => {
            try {
                const { receiverId } = req.params; // accept request to this user
                const senderId = req.user?._id;
                const message = await this.acceptFollowReq.execute(senderId, receiverId);
                loger_1.logger.info(`Follow request sent: ${message}`, { requestId: req.requestId, senderId, receiverId });
                return (0, response_1.success)(res, { message });
            }
            catch (error) {
                loger_1.logger.error(`Follow request failed: ${error.message}`, { requestId: req.requestId });
                next(error);
            }
        };
        this.rejectFollowRequest = async (req, res, next) => {
            try {
                const { receiverId } = req.params; // reject request to this user
                const senderId = req.user?._id || '';
                const message = await this.rejecttFollowReq.execute(senderId, receiverId);
                loger_1.logger.info(`Follow request sent: ${message}`, { requestId: req.requestId, senderId, receiverId });
                return (0, response_1.success)(res, { message }, "Follow request sent successfully");
            }
            catch (error) {
                loger_1.logger.error(`Follow request failed: ${error.message}`, { requestId: req.requestId });
                next(error);
            }
        };
    }
}
exports.UserController = UserController;
