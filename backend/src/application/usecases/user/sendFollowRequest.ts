import { UserRepository } from "../../../infrastructure/repositories/UserRepositoryImpl";
import { FOLLOW_MESSAGE } from "../../../constants/messages/ResponseMessages";
import { CannotFollowSelf, FollowRequestFaild, FollowRequestNotFound } from "../../../presentation/helpers/errors";

export class sendFollowRequest {
    constructor(private userReposatry: UserRepository) { }
    async execute(senderID: string | undefined, receiverID: string) {
        try {
            // validation
            if (!senderID || !receiverID) throw FollowRequestFaild();
            if (senderID === receiverID) throw CannotFollowSelf();
            //find reciver user valid
            const reciverUserExistCheck = await this.userReposatry.findById(receiverID);
            if (!reciverUserExistCheck) throw FollowRequestNotFound();
            // send Request to userId and 
            const { f1, f2 } = await this.userReposatry.sendFollowRequset(senderID, receiverID);
            if (!f1.modifiedCount || !f2.modifiedCount) throw FollowRequestFaild()
            return { message: FOLLOW_MESSAGE.REQUEST.SEND_SUCCESS }
        } catch (error: any) {
            console.error(error.message)
            throw error
        }
    }
}  