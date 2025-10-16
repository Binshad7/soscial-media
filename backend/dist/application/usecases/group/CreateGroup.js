"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGroup = void 0;
class CreateGroup {
    constructor(groupRepository) {
        this.groupRepository = groupRepository;
    }
    async execute(groupData) {
        return this.groupRepository.createGroup(groupData);
    }
}
exports.CreateGroup = CreateGroup;
