import { FOLLOW_MESSAGE } from "../../../constants/messages/ResponseMessages";
import { IUserRepository } from "../../../domain/interfaces/UserRepository";
import { AccepttFollowRequestFail, CannotFollowSelf, UserNotFound } from "../../../presentation/helpers/errors";
import { USER_FIELDS } from "../../../constants/fieldNames";
export class AccepttFollowRequest {
    constructor(private userReposatry: IUserRepository) { }
    async execute(senderID: string | undefined, receiverID: string): Promise<string> {
        try {
            if (!senderID || !receiverID) throw AccepttFollowRequestFail();
            if (senderID === receiverID) throw CannotFollowSelf()
            const reciverUserExistCheck = await this.userReposatry.findById(receiverID);
            if (!reciverUserExistCheck) throw UserNotFound();
            const { receiverRemoveResult, senderRemoveResult } = await this.userReposatry.removeFromUserRelations(
                senderID, 
                receiverID, 
                USER_FIELDS.FRIEND_REQUESTS, 
                USER_FIELDS.SENT_REQUESTS
            );
            if (!receiverRemoveResult || !senderRemoveResult) throw AccepttFollowRequestFail();
            const { receiverUpdateResult, senderUpdateResult } = await this.userReposatry.addUserRelations(
                senderID, 
                receiverID, 
                USER_FIELDS.FOLLOWING, 
                USER_FIELDS.FOLLOWERS
            );
            if (!receiverUpdateResult || !senderUpdateResult) throw AccepttFollowRequestFail();
            return FOLLOW_MESSAGE.ACCEPT.SUCCESS
        } catch (error: any) {
            throw error
        }
    }
}