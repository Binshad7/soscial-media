"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserUseCase = void 0;
const passwordHelpers_1 = require("../../services/passwordHelpers");
const sessionManager_1 = require("../../services/sessionManager");
const errors_1 = require("../../../shared/helpers/errors");
const User_1 = require("../../../domain/entities/User");
class RegisterUserUseCase {
    constructor(_userRepository) {
        this._userRepository = _userRepository;
    }
    async execute(userData) {
        const checkExistEmail = await this._userRepository.findByEmail(userData.email);
        if (checkExistEmail)
            throw (0, errors_1.EmailAlreadyExists)();
        const hashedPassword = await (0, passwordHelpers_1.hashPassword)(userData.password);
        const user = new User_1.User(userData.username, userData.email, hashedPassword);
        const newUserCreated = await this._userRepository.createUser(user);
        // Genarate Token and store session
        const { username, email, _id } = newUserCreated;
        const { accessToken, refreshToken } = await (0, sessionManager_1.sessionManager)({ username, email, _id });
        return { accessToken, refreshToken, username, email };
    }
}
exports.RegisterUserUseCase = RegisterUserUseCase;
