"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUser = void 0;
const passwordHelpers_1 = require("../../helpers/passwordHelpers");
const AppError_1 = require("../../../domain/errors/AppError");
const registerMessage_1 = require("../../../constants/messages/registerMessage");
const StatusCodes_1 = require("../../../constants/StatusCodes");
const tokenCreateHelper_1 = require("../../helpers/tokenCreateHelper");
const sessionStore_1 = require("../../../infrastructure/services/redis/sessionStore");
const uuid_1 = require("uuid");
class RegisterUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(userData) {
        if (userData.username.trim().length === 0)
            throw new AppError_1.AppError(registerMessage_1.REGISTER_MESSAGES.USERNAME_REQUIRED, StatusCodes_1.HTTP_STATUS.BAD_REQUEST);
        if (userData.email.trim().length === 0)
            throw new AppError_1.AppError(registerMessage_1.REGISTER_MESSAGES.EMAIL_REQUIRED, StatusCodes_1.HTTP_STATUS.BAD_REQUEST);
        if (userData.password.trim().length === 0)
            throw new AppError_1.AppError(registerMessage_1.REGISTER_MESSAGES.PASSWORD_REQUIRED, StatusCodes_1.HTTP_STATUS.BAD_REQUEST);
        if (!userData.confirm_password.trim())
            throw new AppError_1.AppError(registerMessage_1.REGISTER_MESSAGES.CONFIRM_PASSWORD_REQUIRED, StatusCodes_1.HTTP_STATUS.BAD_REQUEST);
        if (userData.password !== userData.confirm_password)
            throw new AppError_1.AppError(registerMessage_1.REGISTER_MESSAGES.CONFIRM_PASSWORD_NOT_MATCH, StatusCodes_1.HTTP_STATUS.BAD_REQUEST);
        const checkExistEmail = await this.userRepository.findByEmail(userData.email);
        if (checkExistEmail)
            throw new AppError_1.AppError(registerMessage_1.REGISTER_MESSAGES.USER_ALREADY_EXISTS, StatusCodes_1.HTTP_STATUS.CONFLICT);
        const hashedPassword = await (0, passwordHelpers_1.hashPassword)(userData.password);
        userData.password = hashedPassword;
        const newUserCreated = await this.userRepository.createUser(userData);
        const { username, email, _id } = newUserCreated;
        const redisKey = (0, uuid_1.v4)();
        const { token, refreshToken } = (0, tokenCreateHelper_1.createTokenPair)(redisKey);
        await (0, sessionStore_1.storeUserSession)(redisKey, _id, refreshToken, username, email);
        return { token, refreshToken, username, email, message: registerMessage_1.REGISTER_MESSAGES.REGISTRATION_SUCCESS };
    }
}
exports.RegisterUser = RegisterUser;
