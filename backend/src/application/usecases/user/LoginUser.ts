import { UserRepository } from "../../../infrastructure/repositories/UserRepositoryImpl";
import { comparePassowrd } from "../../helpers/passwordHelpers";
import { AppError } from "../../../domain/errors/AppError";
import { USER_MESSAGE, COMMON_MESSAGE } from "../../../constants/messages/ResponseMessages";
import { HTTP_STATUS } from "../../../constants/StatusCodes";
import { sessionManager } from "../../helpers/sessionManager";
import { logger } from "../../../shared/helpers/loger";

export class LoginUser {
    constructor(private userRepository: UserRepository) { }
    async execute(email: string, password: string) {
        try {
            const checkExistUser = await this.userRepository.findByEmail(email);
            if (!checkExistUser) throw new AppError(USER_MESSAGE.LOGIN.INVALID_CREDENTIALS, HTTP_STATUS.BAD_REQUEST);
            const checkPasswordMaching = await comparePassowrd(password, checkExistUser.password);
            if (!checkPasswordMaching) throw new AppError(USER_MESSAGE.LOGIN.INVALID_CREDENTIALS, HTTP_STATUS.BAD_REQUEST);
            // Generate Token And Session
            const { accessToken, refreshToken } = await sessionManager({ username: checkExistUser.username, email, _id: checkExistUser._id });
            return { accessToken, refreshToken, username: checkExistUser.username, email, message: COMMON_MESSAGE.SUCCESS }
        } catch (error: any) {
            logger.error("Login failed", { error });
            throw new Error()
        }
    }
}