import { IGroup } from "../../../domain/entities/Group";
import { GroupRepository } from "../../../infrastructure/repositories/GroupRepositoryImpl";

export class CreateGroup {
    constructor(private groupRepository: GroupRepository) { }

    async execute(groupData: IGroup) {
        return this.groupRepository.createGroup(groupData);
    }
}