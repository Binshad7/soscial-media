"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUser = void 0;
const passwordHelpers_1 = require("../../helpers/passwordHelpers");
const sessionManager_1 = require("../../helpers/sessionManager");
const loger_1 = require("../../../shared/helpers/loger");
const errors_1 = require("../../../presentation/helpers/errors");
class RegisterUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(userData) {
        try {
            console.log('eee ');
            const checkExistEmail = await this.userRepository.findByEmail(userData.email);
            if (checkExistEmail)
                throw (0, errors_1.EmailAlreadyExists)();
            const hashedPassword = await (0, passwordHelpers_1.hashPassword)(userData.password);
            userData.password = hashedPassword;
            const { confirm_password, ...user } = userData;
            const newUserCreated = await this.userRepository.createUser(user);
            // Genarate Token and store session
            const { username, email, _id } = newUserCreated;
            const { accessToken, refreshToken } = await (0, sessionManager_1.sessionManager)({ username, email, _id });
            return { accessToken, refreshToken, username, email };
        }
        catch (error) {
            loger_1.logger.error("Registration failed", { error });
            throw error;
        }
    }
}
exports.RegisterUser = RegisterUser;
