"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const UserModel_1 = __importDefault(require("../db/mongoose/models/UserModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const BaseRepository_1 = require("./BaseRepository");
class UserRepository extends BaseRepository_1.BaseRepository {
    async createUser(user) {
        return this.execute(async () => {
            return await UserModel_1.default.create(user);
        });
    }
    async findById(id) {
        return this.execute(async () => {
            return await UserModel_1.default.findById(id);
        });
    }
    async findByEmail(email) {
        return this.execute(async () => {
            return await UserModel_1.default.findOne({ email });
        });
    }
    async updateUser(id, update) {
        return this.execute(async () => {
            return await UserModel_1.default.findByIdAndUpdate(id, update, { new: true });
        });
    }
    async addUserRelations(senderId, receiverId, receiverField, senderField) {
        return this.execute(async () => {
            const session = await mongoose_1.default.startSession();
            session.startTransaction();
            try {
                const receiverUpdateResult = await UserModel_1.default.updateOne({ _id: receiverId, [receiverField]: { $ne: senderId } }, { $addToSet: { [receiverField]: senderId } }, { session });
                const senderUpdateResult = await UserModel_1.default.updateOne({ _id: senderId, [senderField]: { $ne: receiverId } }, { $addToSet: { [senderField]: receiverId } }, { session });
                await session.commitTransaction();
                return { receiverUpdateResult, senderUpdateResult };
            }
            catch (error) {
                await session.abortTransaction();
                throw error;
            }
            finally {
                await session.endSession();
            }
        });
    }
    async removeFromUserRelations(senderID, receiverID, friendRequests, sentRequests) {
        return this.execute(async () => {
            const session = await mongoose_1.default.startSession();
            session.startTransaction();
            try {
                const receiverRemoveResult = await UserModel_1.default.updateOne({ _id: receiverID, [friendRequests]: { $ne: senderID } }, { $pull: { [friendRequests]: senderID } }, { session });
                const senderRemoveResult = await UserModel_1.default.updateOne({ _id: senderID, [sentRequests]: { $ne: receiverID } }, { $pull: { [sentRequests]: receiverID } }, { session });
                await session.commitTransaction();
                return { receiverRemoveResult, senderRemoveResult };
            }
            catch (error) {
                await session.abortTransaction();
                throw error;
            }
            finally {
                await session.endSession();
            }
        });
    }
}
exports.UserRepository = UserRepository;
