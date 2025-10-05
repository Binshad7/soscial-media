import { IGroup } from "../entities/Group";

export interface IGroupRepository {
  createGroup(group: IGroup): Promise<IGroup>;
  findById(id: string): Promise<IGroup | null>;
  addMember(groupId: string, userId: string): Promise<IGroup | null>;
}   