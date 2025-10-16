"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUser = void 0;
const passwordHelpers_1 = require("../../helpers/passwordHelpers");
const AppError_1 = require("../../../domain/errors/AppError");
const loginMessages_1 = require("../../../constants/messages/loginMessages");
const StatusCodes_1 = require("../../../constants/StatusCodes");
const jwtToken_1 = require("../../helpers/jwtToken");
const sessionStore_1 = require("../../../infrastructure/services/redis/sessionStore");
const uuid_1 = require("uuid");
class LoginUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(email, password) {
        if (!email || email.trim().length === 0)
            throw new AppError_1.AppError(loginMessages_1.LOGIN_MESSAGES.EMAIL_REQUIRED, StatusCodes_1.HTTP_STATUS.BAD_REQUEST);
        if (!password || password.length === 0)
            throw new AppError_1.AppError(loginMessages_1.LOGIN_MESSAGES.PASSWORD_REQUIRED, StatusCodes_1.HTTP_STATUS.BAD_REQUEST);
        const checkExistUser = await this.userRepository.findByEmail(email);
        if (!checkExistUser)
            throw new AppError_1.AppError(loginMessages_1.LOGIN_MESSAGES.INVALID_CREDENTIALS, StatusCodes_1.HTTP_STATUS.BAD_REQUEST);
        const checkPasswordMaching = await (0, passwordHelpers_1.comparePassowrd)(password, checkExistUser.password);
        if (!checkPasswordMaching)
            throw new AppError_1.AppError(loginMessages_1.LOGIN_MESSAGES.INVALID_CREDENTIALS, StatusCodes_1.HTTP_STATUS.BAD_REQUEST);
        const redisKey = (0, uuid_1.v4)();
        const token = (0, jwtToken_1.generateJwtToken)(redisKey);
        const refreshToken = (0, jwtToken_1.generateJwtToken)(redisKey, true);
        await (0, sessionStore_1.storeUserSession)(redisKey, checkExistUser._id, refreshToken, checkExistUser.username, email);
        return { token, refreshToken, username: checkExistUser.username, email, message: loginMessages_1.LOGIN_MESSAGES.LOGIN_SUCCESS };
    }
}
exports.LoginUser = LoginUser;
