import { RegisterUserData } from "../../../domain/entities/User";
import { UserRepository } from "../../../infrastructure/repositories/UserRepositoryImpl";
import { hashPassword } from "../../helpers/passwordHelpers";
import { sessionManager } from "../../helpers/sessionManager";
import { logger } from "../../../shared/helpers/loger";
import { EmailAlreadyExists } from "../../../presentation/helpers/errors";


export class RegisterUser {
    constructor(private userRepository: UserRepository) { }
    async execute(userData: RegisterUserData) {
        try {
            const checkExistEmail = await this.userRepository.findByEmail(userData.email);
            if (checkExistEmail) throw EmailAlreadyExists();
            // create new user
            const hashedPassword = await hashPassword(userData.password);
            userData.password = hashedPassword;
            const { confirm_password, ...user } = userData
            const newUserCreated = await this.userRepository.createUser(user);
            // Genarate Token and store session
            const { username, email, _id } = newUserCreated;
            const { accessToken, refreshToken } = await sessionManager({ username, email, _id });
            return { accessToken, refreshToken, username, email }
        } catch (error: any) {
            logger.error("Registration failed", { error });
            throw error
        }
    }
}