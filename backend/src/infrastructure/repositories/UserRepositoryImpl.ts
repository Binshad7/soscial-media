import UserModel from "../db/mongoose/models/UserModel";
import { IUser, StoreUser } from "../../domain/entities/User";
import mongoose from "mongoose";
import { IUserRepository } from "../../domain/interfaces/UserRepository";
import { BaseRepository } from "./BaseRepository";

export class UserRepository extends BaseRepository implements IUserRepository {

  async createUser(user: StoreUser) {
    return this.execute(async () => {
      return await UserModel.create(user);
    });
  }

  async findById(id: string) {
    return this.execute(async () => {
      return await UserModel.findById(id);
    });
  }

  async findByEmail(email: string) {
    return this.execute(async () => {
      return await UserModel.findOne({ email });
    });
  }

  async updateUser(id: string, update: Partial<IUser>) {
    return this.execute(async () => {
      return await UserModel.findByIdAndUpdate(id, update, { new: true });
    });
  }

  async addUserRelations(senderId: string, receiverId: string, receiverField: string, senderField: string): Promise<{ receiverUpdateResult: any, senderUpdateResult: any }> {
    return this.execute(async () => {
      const session = await mongoose.startSession();
      await session.startTransaction();
      
      try {
        const receiverUpdateResult = await UserModel.updateOne(
          { _id: receiverId, [receiverField]: { $ne: senderId } },
          { $addToSet: { [receiverField]: senderId } },
          { session }
        );

        const senderUpdateResult = await UserModel.updateOne(
          { _id: senderId, [senderField]: { $ne: receiverId } },
          { $addToSet: { [senderField]: receiverId } },
          { session }
        );

        await session.commitTransaction();
        return { receiverUpdateResult, senderUpdateResult };
      } catch (error) {
        await session.abortTransaction();
        throw error;
      } finally {
        await session.endSession();
      }
    });
  }

  async removeFromUserRelations(senderID: string, receiverID: string, friendRequests: string, sentRequests: string): Promise<{ receiverRemoveResult: any, senderRemoveResult: any }> {
    return this.execute(async () => {
      const session = await mongoose.startSession();
      await session.startTransaction();
      
      try {
        const receiverRemoveResult = await UserModel.updateOne(
          { _id: receiverID, [friendRequests]: { $ne: senderID } },
          { $pull: { [friendRequests]: senderID } },
          { session }
        );
        
        const senderRemoveResult = await UserModel.updateOne(
          { _id: senderID, [sentRequests]: { $ne: receiverID } },
          { $pull: { [sentRequests]: receiverID } },
          { session }
        );
        
        await session.commitTransaction();
        return { receiverRemoveResult, senderRemoveResult };
      } catch (error) {
        await session.abortTransaction();
        throw error;
      } finally {
        await session.endSession();
      }
    });
  }


}