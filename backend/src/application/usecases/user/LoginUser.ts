import { UserRepository } from "../../../infrastructure/repositories/UserRepositoryImpl";

export class LoginUser {
    constructor(private userRepository: UserRepository) { }

    async execute(email: string, password: string) {
        // Here you would hash password, validate data, etc.
        // validation and comparePassword
        return this.userRepository.loginUser(email);
    }
}