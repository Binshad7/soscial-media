import { IUser } from "../../../domain/entities/User";
import { UserRepository } from "../../../infrastructure/repositories/UserRepositoryImpl";
import { hashPassword } from "../../helpers/passwordHelpers";
import { AppError } from "../../../domain/errors/AppError";
import { REGISTER_MESSAGES } from "../../../constants/messages/registerMessage";
import { HTTP_STATUS } from "../../../constants/StatusCodes";
import { createTokenPair } from "../../helpers/tokenCreateHelper";
import { storeUserSession } from "../../../infrastructure/services/redis/sessionStore";

export class RegisterUser {
    constructor(private userRepository: UserRepository) { }
    async execute(userData: IUser) {
        if (userData.username.trim().length === 0) throw new AppError(REGISTER_MESSAGES.USERNAME_REQUIRED, HTTP_STATUS.BAD_REQUEST)
        if (userData.email.trim().length === 0) throw new AppError(REGISTER_MESSAGES.EMAIL_REQUIRED, HTTP_STATUS.BAD_REQUEST)
        if (userData.password.trim().length === 0) throw new AppError(REGISTER_MESSAGES.PASSWORD_REQUIRED, HTTP_STATUS.BAD_REQUEST)
        if (!userData.confirm_password.trim()) throw new AppError(REGISTER_MESSAGES.CONFIRM_PASSWORD_REQUIRED, HTTP_STATUS.BAD_REQUEST)
        if (userData.password !== userData.confirm_password) throw new AppError(REGISTER_MESSAGES.CONFIRM_PASSWORD_NOT_MATCH, HTTP_STATUS.BAD_REQUEST)
        const checkExistEmail = await this.userRepository.findByEmail(userData.email);
        if (checkExistEmail) throw new AppError(REGISTER_MESSAGES.USER_ALREADY_EXISTS, HTTP_STATUS.CONFLICT);
        const hashedPassword = await hashPassword(userData.password);
        userData.password = hashedPassword;
        const newUserCreated = await this.userRepository.createUser(userData);
        const { username, email, _id } = newUserCreated;
        const { token, refreshToken } = createTokenPair(_id)
        await storeUserSession(_id, token, refreshToken, username, email)
        return { token, username, email, message: REGISTER_MESSAGES.REGISTRATION_SUCCESS }
    }
}