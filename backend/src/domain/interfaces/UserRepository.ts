import { IUser } from "../../shared/types/User";
import { User } from "../entities/User";
export interface IUserRepository {
  createUser(user: User): Promise<IUser>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  updateUser(id: string, update: Partial<IUser>): Promise<IUser | null>;
  addUserRelations(senderID: string, receiverID: string, receiverField: string, senderField: string): Promise<{ receiverUpdateResult: any, senderUpdateResult: any }>;
  removeFromUserRelations(senderID: string, receiverID: string, operation1: string, operation2: string): Promise<{ receiverRemoveResult: any, senderRemoveResult: any }>;
}