import { IUser } from "../entities/User";

export interface IUserRepository {
  createUser(user: IUser): Promise<IUser>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  updateUser(id: string, update: Partial<IUser>): Promise<IUser | null>;
}