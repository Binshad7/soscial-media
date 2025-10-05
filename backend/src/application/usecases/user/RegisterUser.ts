import { IUser } from "../../../domain/entities/User";
import { UserRepository } from "../../../infrastructure/repositories/UserRepositoryImpl";

export class RegisterUser {
    constructor(private userRepository: UserRepository) { }

    async execute(userData: IUser) {
        // Here you would hash password, validate data, etc.
        return this.userRepository.createUser(userData);
    }
}