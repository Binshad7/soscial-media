"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const UserModel_1 = __importDefault(require("../db/mongoose/UserModel"));
class UserRepository {
    async createUser(user) {
        return UserModel_1.default.create(user);
    }
    async findById(id) {
        return UserModel_1.default.findById(id);
    }
    async findByEmail(email) {
        return UserModel_1.default.findOne({ email });
    }
    async updateUser(id, update) {
        return UserModel_1.default.findByIdAndUpdate(id, update, { new: true });
    }
}
exports.UserRepository = UserRepository;
