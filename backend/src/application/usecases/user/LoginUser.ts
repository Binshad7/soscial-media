import { UserRepository } from "../../../infrastructure/repositories/UserRepositoryImpl";
import { comparePassowrd } from "../../helpers/passwordHelpers";
import { AppError } from "../../../domain/errors/AppError";
import { LOGIN_MESSAGES } from "../../../constants/messages/loginMessages";
import { HTTP_STATUS } from "../../../constants/StatusCodes";
import { generateJwtToken } from "../../helpers/jwtToken";
import { storeUserSession } from "../../../infrastructure/services/redis/sessionStore";
export class LoginUser {
    constructor(private userRepository: UserRepository) { }
    async execute(email: string, password: string) {
        if (!email || email.trim().length === 0) throw new AppError(LOGIN_MESSAGES.EMAIL_REQUIRED, HTTP_STATUS.BAD_REQUEST);
        if (!password || password.length === 0) throw new AppError(LOGIN_MESSAGES.PASSWORD_REQUIRED, HTTP_STATUS.BAD_REQUEST);
        const checkExistUser = await this.userRepository.findByEmail(email);
        if (!checkExistUser) throw new AppError(LOGIN_MESSAGES.INVALID_CREDENTIALS, HTTP_STATUS.BAD_REQUEST);
        const checkPasswordMaching = await comparePassowrd(password, checkExistUser.password);
        if (!checkPasswordMaching) throw new AppError(LOGIN_MESSAGES.INVALID_CREDENTIALS, HTTP_STATUS.BAD_REQUEST);
        const token = generateJwtToken(checkExistUser._id);
        const refreshToken = generateJwtToken(checkExistUser._id, true);
        await storeUserSession(checkExistUser._id, token, refreshToken, checkExistUser.username, email)
        return { token, username: checkExistUser.username, email, message: LOGIN_MESSAGES.LOGIN_SUCCESS }
    }
}