import UserModel from "../db/mongoose/models/UserModel";
import { IUser, StoreUser } from "../../domain/entities/User";
import mongoose from "mongoose";
export class UserRepository {
  async createUser(user: StoreUser) {
    try {
      return UserModel.create(user);
    } catch (error: any) {
      throw error
    }
  }
  async findById(id: string) {
    try {
      return UserModel.findById(id);
    } catch (error: any) {
      throw error
    }
  }
  async findByEmail(email: string) {
    try {
      return UserModel.findOne({ email });
    } catch (error: any) {
      throw error
    }
  }
  async updateUser(id: string, update: Partial<IUser>) {
    return UserModel.findByIdAndUpdate(id, update, { new: true });
  }
  async sendFollowRequset(senderId: string, receiverId: string) {
    const session = await mongoose.startSession()
    try {
      const f1 = await UserModel.updateOne(
        { _id: receiverId, friendRequests: { $ne: senderId } },
        { $addToSet: { friendRequests: senderId } },
        { session }
      )
      const f2 = await UserModel.updateOne(
        { _id: senderId, sentRequests: { $ne: receiverId } },
        { $addToSet: { sentRequests: receiverId } },
        { session }
      )
      session.commitTransaction()
      return {f1,f2}
    } catch (error: any) {
      session.abortTransaction()
      throw error

    } finally {
      session.endSession()
    }
  }
}