import { IUserRepository } from "../../../domain/interfaces/UserRepository";
import { FOLLOW_MESSAGE } from "../../../constants/messages/ResponseMessages";
import { CannotFollowSelf, FollowRequestFaild, UserNotFound } from "../../../presentation/helpers/errors";
import { logger } from "../../../shared/helpers/loger";
import { USER_FIELDS } from "../../../constants/fieldNames";

export class sendFollowRequest {
    constructor(private userReposatry: IUserRepository) { }
    async execute(senderID: string | undefined, receiverID: string) {
        try {
            // validation
            if (!senderID || !receiverID) throw FollowRequestFaild();
            if (senderID === receiverID) throw CannotFollowSelf();
            //find reciver user valid
            const reciverUserExistCheck = await this.userReposatry.findById(receiverID);
            if (!reciverUserExistCheck) throw UserNotFound();
            // send Request to userId and 
            const { receiverUpdateResult, senderUpdateResult } = await this.userReposatry.addUserRelations(
                senderID, 
                receiverID, 
                USER_FIELDS.FRIEND_REQUESTS, 
                USER_FIELDS.SENT_REQUESTS
            );
            if (!receiverUpdateResult.modifiedCount || !senderUpdateResult.modifiedCount) throw FollowRequestFaild()
            return { message: FOLLOW_MESSAGE.REQUEST.SEND_SUCCESS }
        } catch (error: any) {
            logger.error('Follow request failed', { 
                error: error.message, 
                senderID, 
                receiverID 
            });
            throw error;
        }
    }
}  