import { IUser } from "../../../domain/entities/User";
import { UserRepository } from "../../../infrastructure/repositories/UserRepositoryImpl";
import { hashPassword } from "../../helpers/passwordHelpers";
import { AppError } from "../../../domain/errors/AppError";
import { USER_MESSAGE } from "../../../constants/messages/userMessages";
import { COMMON_MESSAGES } from "../../../constants/messages/commonMessages";
import { HTTP_STATUS } from "../../../constants/StatusCodes";
import { createTokenPair } from "../../helpers/tokenCreateHelper";
import { storeUserSession } from "../../../infrastructure/services/redis/sessionStore";
import { v4 as uuid } from 'uuid'

export class RegisterUser {
    constructor(private userRepository: UserRepository) { }
    async execute(userData: IUser) {
        try {
            // validation
            if (!userData.username.trim()) throw new AppError(USER_MESSAGE.USERNAME_REQUIRED, HTTP_STATUS.BAD_REQUEST)
            if (!userData.email.trim()) throw new AppError(USER_MESSAGE.EMAIL_REQUIRED, HTTP_STATUS.BAD_REQUEST)
            if (!userData.password.trim()) throw new AppError(USER_MESSAGE.PASSWORD_REQUIRED, HTTP_STATUS.BAD_REQUEST)
            if (!userData.confirm_password.trim()) throw new AppError(USER_MESSAGE.CONFIRM_PASSWORD_REQUIRED, HTTP_STATUS.BAD_REQUEST)
            if (userData.password !== userData.confirm_password) throw new AppError(USER_MESSAGE.CONFIRM_PASSWORD_NOT_MATCH, HTTP_STATUS.BAD_REQUEST)
            const checkExistEmail = await this.userRepository.findByEmail(userData.email);
            if (checkExistEmail) throw new AppError(USER_MESSAGE.USER_ALREADY_EXISTS, HTTP_STATUS.CONFLICT);
            // create new user
            const hashedPassword = await hashPassword(userData.password);
            userData.password = hashedPassword;
            const newUserCreated = await this.userRepository.createUser(userData); // avoid sending confirm password    
            // Genarate Token and store session
            const { username, email, _id } = newUserCreated;
            const redisKey = uuid()
            const { token, refreshToken } = createTokenPair(redisKey)
            await storeUserSession(redisKey, _id, refreshToken, username, email)
            return { token, refreshToken, username, email, message: USER_MESSAGE.REGISTRATION_SUCCESS }
        } catch (error: any) {
            console.error(error.message);
            throw new AppError(COMMON_MESSAGES.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR)
        }
    }
}