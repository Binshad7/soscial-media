import UserModel from "../db/mongoose/models/UserModel";
import { IUser } from "../../domain/entities/User";
import mongoose from "mongoose";
export class UserRepository {
  async createUser(user: IUser) {
    return UserModel.create(user);
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
  async sendFollowRequset(senderId: string, receiverId: string) {

    if (!senderId || !receiverId) throw new Error("Invalid user ids");
    if (senderId === receiverId) throw new Error("Cannot send request to self");
    const session = await mongoose.startSession()
    try {


      await UserModel.updateOne(
        { _id: receiverId, friendRequests: { $ne: senderId } },
        { $addToSet: { friendRequests: senderId } },
        { session }
      )
      await UserModel.updateOne(
        { _id: senderId, sentRequests: { $ne: receiverId } },
        { $addToSet: { sentRequests: receiverId } },
        { session }
      )
      session.commitTransaction()
      return
    } catch (error: any) {
      session.abortTransaction()

    } finally {
      session.endSession()
    }
  }
}