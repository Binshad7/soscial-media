import { comparePassword } from "../../helpers/passwordHelpers";
import { sessionManager } from "../../helpers/sessionManager";
import { logger } from "../../../shared/helpers/loger";
import { InvalidCredentials } from "../../../presentation/helpers/errors";
import { IUserRepository } from "../../../domain/interfaces/UserRepository";

export class LoginUser {
    constructor(private userRepository: IUserRepository) { }
    async execute(email: string, password: string) {
        try {
            const checkExistUser = await this.userRepository.findByEmail(email);
            if (!checkExistUser) throw InvalidCredentials();
            const checkPasswordMatching = await comparePassword(password, checkExistUser.password);
            if (!checkPasswordMatching) throw InvalidCredentials();
            // Generate Token And Session
            const { accessToken, refreshToken } = await sessionManager({ username: checkExistUser.username, email, _id: checkExistUser._id });
            return { accessToken, refreshToken, username: checkExistUser.username, email }
        } catch (error: any) {
            logger.error("Login failed", { error });
            throw error
        }
    }
}