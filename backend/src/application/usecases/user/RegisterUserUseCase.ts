import { RegisterUserData } from "../../../shared/types/User";
import { hashPassword } from "../../services/passwordHelpers";
import { sessionManager } from "../../services/sessionManager";
import { EmailAlreadyExists } from "../../../shared/helpers/errors";
import { IUserRepository } from "../../../domain/interfaces/UserRepository";
import { User } from "../../../domain/entities/User";



export class RegisterUserUseCase {
    constructor(private readonly _userRepository: IUserRepository) { }
    async execute(userData: RegisterUserData) {

        const checkExistEmail = await this._userRepository.findByEmail(userData.email);
        if (checkExistEmail) throw EmailAlreadyExists();

        const hashedPassword = await hashPassword(userData.password);
        const user = new User(userData.username,userData.email,hashedPassword)
        const newUserCreated = await this._userRepository.createUser(user);

        // Genarate Token and store session
        const { username, email, _id } = newUserCreated;
        const { accessToken, refreshToken } = await sessionManager({ username, email, _id });
        return { accessToken, refreshToken, username, email }

    }
}