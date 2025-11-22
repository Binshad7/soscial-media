"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const cookieHelper_1 = require("../helpers/cookieHelper");
const loger_1 = require("../../shared/helpers/loger");
const response_1 = require("../helpers/response");
class UserController {
    constructor(_registerUserUseCase, _loginUserUseCase, _sendFollowReqUseCase, _acceptFollowReqUseCase, _rejecttFollowReqUseCase) {
        this._registerUserUseCase = _registerUserUseCase;
        this._loginUserUseCase = _loginUserUseCase;
        this._sendFollowReqUseCase = _sendFollowReqUseCase;
        this._acceptFollowReqUseCase = _acceptFollowReqUseCase;
        this._rejecttFollowReqUseCase = _rejecttFollowReqUseCase;
        this.register = async (req, res, next) => {
            try {
                const { username, email, accessToken, refreshToken } = await this._registerUserUseCase.execute(req.body);
                (0, cookieHelper_1.setAuthCookie)(res, accessToken, refreshToken);
                loger_1.logger.info(`Registration successful for user: ${username}`, { requestId: req.requestId });
                return (0, response_1.registerSuccess)(res, { username, email });
            }
            catch (error) {
                loger_1.logger.error(`Registration failed: ${error.message}`, { requestId: req.requestId });
                next(error);
            }
        };
        this.login = async (req, res, next) => {
            try {
                const { username, email, accessToken, refreshToken } = await this._loginUserUseCase.execute(req.body.email, req.body.password);
                (0, cookieHelper_1.setAuthCookie)(res, accessToken, refreshToken);
                loger_1.logger.info(`Login successful for user: ${username}`, { requestId: req.requestId });
                return (0, response_1.loginSuccess)(res, { username, email });
            }
            catch (error) {
                loger_1.logger.error(`Login failed: ${error.message}`, { requestId: req.requestId });
                next(error);
            }
        };
        this.userValidCheck = async (req, res, next) => {
            try {
                const user = req.user;
                (0, response_1.authSuccess)(res, user);
            }
            catch (error) {
                next(error);
            }
        };
        this.sendFollowRequest = async (req, res, next) => {
            try {
                const { receiverId } = req.params; // sending request to this user
                const senderId = req.user?._id;
                const { message } = await this._sendFollowReqUseCase.execute(senderId, receiverId);
                loger_1.logger.info(`Follow request sent: ${message}`, { requestId: req.requestId, senderId, receiverId: receiverId });
                return (0, response_1.success)(res, message);
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
                const message = await this._acceptFollowReqUseCase.execute(senderId, receiverId);
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
                const message = await this._rejecttFollowReqUseCase.execute(senderId, receiverId);
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
