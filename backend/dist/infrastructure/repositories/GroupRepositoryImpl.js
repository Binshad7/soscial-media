"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupRepository = void 0;
const GroupModel_1 = __importDefault(require("../db/mongoose/GroupModel"));
class GroupRepository {
    async createGroup(group) {
        return GroupModel_1.default.create(group);
    }
    async findById(id) {
        return GroupModel_1.default.findById(id);
    }
    async addMember(groupId, userId) {
        return GroupModel_1.default.findByIdAndUpdate(groupId, { $addToSet: { members: userId } }, { new: true });
    }
}
exports.GroupRepository = GroupRepository;
