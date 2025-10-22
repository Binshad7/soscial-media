import { UserRepository } from "../../../infrastructure/repositories/UserRepositoryImpl";
import { comparePassowrd } from "../../helpers/passwordHelpers";
import { sessionManager } from "../../helpers/sessionManager";
import { logger } from "../../../shared/helpers/loger";
import { InvalidCredentials } from "../../../presentation/helpers/errors";

export class LoginUser {
    constructor(private userRepository: UserRepository) { }
    async execute(email: string, password: string) {
        try {
            const checkExistUser = await this.userRepository.findByEmail(email);
            if (!checkExistUser) throw InvalidCredentials();
            const checkPasswordMaching = await comparePassowrd(password, checkExistUser.password);
            if (!checkPasswordMaching) throw  InvalidCredentials();
            // Generate Token And Session
            const { accessToken, refreshToken } = await sessionManager({ username: checkExistUser.username, email, _id: checkExistUser._id });
            return { accessToken, refreshToken, username: checkExistUser.username, email }
        } catch (error: any) {
            logger.error("Login failed", { error });
            throw  error
        }
    }
}