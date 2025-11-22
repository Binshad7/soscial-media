"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUser = void 0;
const passwordHelpers_1 = require("../../helpers/passwordHelpers");
const sessionManager_1 = require("../../helpers/sessionManager");
const errors_1 = require("../../../presentation/helpers/errors");
class LoginUser {
    constructor(_userRepository) {
        this._userRepository = _userRepository;
    }
    async execute(email, password) {
        const checkExistUser = await this._userRepository.findByEmail(email);
        if (!checkExistUser)
            throw (0, errors_1.InvalidCredentials)();
        const checkPasswordMatching = await (0, passwordHelpers_1.comparePassword)(password, checkExistUser.password);
        if (!checkPasswordMatching)
            throw (0, errors_1.InvalidCredentials)();
        // Generate Token And Session
        const { accessToken, refreshToken } = await (0, sessionManager_1.sessionManager)({ username: checkExistUser.username, email, _id: checkExistUser._id });
        return { accessToken, refreshToken, username: checkExistUser.username, email };
    }
}
exports.LoginUser = LoginUser;
