import { comparePassword } from "../../services/passwordHelpers";
import { sessionManager } from "../../services/sessionManager";
import { InvalidCredentials } from "../../../shared/helpers/errors";
import { IUserRepository } from "../../../domain/interfaces/UserRepository";

export class LoginUserUseCase {
    constructor(private readonly _userRepository: IUserRepository) { }
    async execute(email: string, password: string) {

        const checkExistUser = await this._userRepository.findByEmail(email);
        if (!checkExistUser) throw InvalidCredentials();
        const checkPasswordMatching = await comparePassword(password, checkExistUser.password);
        if (!checkPasswordMatching) throw InvalidCredentials();
        // Generate Token And Session
        const { accessToken, refreshToken } = await sessionManager({ username: checkExistUser.username, email, _id: checkExistUser._id });
        return { accessToken, refreshToken, username: checkExistUser.username, email }

    }
}