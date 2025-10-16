import { UserRepository } from "../../../infrastructure/repositories/UserRepositoryImpl";
import { comparePassowrd } from "../../helpers/passwordHelpers";
import { AppError } from "../../../domain/errors/AppError";
import { USER_MESSAGE } from "../../../constants/messages/userMessages";
import { COMMON_MESSAGES } from "../../../constants/messages/commonMessages";
import { HTTP_STATUS } from "../../../constants/StatusCodes";
import { generateJwtToken } from "../../helpers/jwtToken";
import { storeUserSession } from "../../../infrastructure/services/redis/sessionStore";
import { v4 as uuid } from "uuid";

export class LoginUser {
    constructor(private userRepository: UserRepository) { }
    async execute(email: string, password: string) {
        try {
            // validation
            if (!email || email.trim().length === 0) throw new AppError(USER_MESSAGE.EMAIL_REQUIRED, HTTP_STATUS.BAD_REQUEST);
            if (!password || password.length === 0) throw new AppError(USER_MESSAGE.PASSWORD_REQUIRED, HTTP_STATUS.BAD_REQUEST);
            const checkExistUser = await this.userRepository.findByEmail(email);
            if (!checkExistUser) throw new AppError(USER_MESSAGE.INVALID_CREDENTIALS, HTTP_STATUS.BAD_REQUEST);
            const checkPasswordMaching = await comparePassowrd(password, checkExistUser.password);
            if (!checkPasswordMaching) throw new AppError(USER_MESSAGE.INVALID_CREDENTIALS, HTTP_STATUS.BAD_REQUEST);
            // Generate Token And Session
            const redisKey = uuid();
            const token = generateJwtToken(redisKey);
            const refreshToken = generateJwtToken(redisKey, true);
            await storeUserSession(redisKey, checkExistUser._id, refreshToken, checkExistUser.username, email)
            return { token, refreshToken, username: checkExistUser.username, email, message: USER_MESSAGE.LOGIN_SUCCESS }
        } catch (error: any) {
            console.error(error.message);
            throw new AppError(COMMON_MESSAGES.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    }
}