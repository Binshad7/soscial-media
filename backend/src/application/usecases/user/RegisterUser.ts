import { RegisterUserData } from "../../../domain/entities/User";
import { UserRepository } from "../../../infrastructure/repositories/UserRepositoryImpl";
import { hashPassword } from "../../helpers/passwordHelpers";
import { AppError } from "../../../domain/errors/AppError";
import { USER_MESSAGE, COMMON_MESSAGE } from "../../../constants/messages/ResponseMessages";
import { HTTP_STATUS } from "../../../constants/StatusCodes";
import { sessionManager } from "../../helpers/sessionManager";
import { logger } from "../../../shared/helpers/loger";

export class RegisterUser {
    constructor(private userRepository: UserRepository) { }
    async execute(userData: RegisterUserData) {
        try {
            const checkExistEmail = await this.userRepository.findByEmail(userData.email);
            if (checkExistEmail) throw new AppError(USER_MESSAGE.REGISTER.USER_ALREADY_EXISTS, HTTP_STATUS.CONFLICT);
            // create new user
            const hashedPassword = await hashPassword(userData.password);
            userData.password = hashedPassword;
            const { confirm_password, ...user } = userData
            const newUserCreated = await this.userRepository.createUser(user);
            // Genarate Token and store session
            const { username, email, _id } = newUserCreated;
            const { accessToken, refreshToken } = await sessionManager({ username, email, _id });
            return { accessToken, refreshToken, username, email, message: COMMON_MESSAGE.SUCCESS }
        } catch (error: any) {
            logger.error("Registration failed", { error });
            throw error
        }
    }
}