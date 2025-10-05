import UserModel from "../db/mongoose/UserModel";
import { IUser } from "../../domain/entities/User";

export class UserRepository {
  async createUser(user: IUser) {
    return UserModel.create(user);
  }
  async loginUser(email: string) {
    return UserModel.findOne({ email })
  }
  async findById(id: string) {
    return UserModel.findById(id);
  }
  async findByEmail(email: string) {
    return UserModel.findOne({ email });
  }
  async updateUser(id: string, update: Partial<IUser>) {
    return UserModel.findByIdAndUpdate(id, update, { new: true });
  }
}