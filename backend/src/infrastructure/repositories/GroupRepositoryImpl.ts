import GroupModel from "../db/mongoose/GroupModel";
import { IGroup } from "../../domain/entities/Group";

export class GroupRepository {
  async createGroup(group: IGroup) {
    return GroupModel.create(group);
  }
  async findById(id: string) {
    return GroupModel.findById(id);
  }
  async addMember(groupId: string, userId: string) {
    return GroupModel.findByIdAndUpdate(
      groupId,
      { $addToSet: { members: userId } },
      { new: true }
    );
  }
}