import { FOLLOW_MESSAGE } from "../../../constants/messages/ResponseMessages";
import { IUserRepository } from "../../../domain/interfaces/UserRepository";
import { AccepttFollowRequestFail, CannotFollowSelf, UserNotFound } from "../../../shared/helpers/errors";
import { USER_FIELDS } from "../../../constants/fieldNames";

export class RejectFollowRequestUseCase {
    constructor(private readonly _userReposatry: IUserRepository) { }
    async execute(senderID: string, receiverID: string): Promise<string> {

        if (!senderID || !receiverID) throw AccepttFollowRequestFail();
        if (senderID === receiverID) throw CannotFollowSelf()
        const reciverUserExistCheck = await this._userReposatry.findById(receiverID);
        if (!reciverUserExistCheck) throw UserNotFound();
        const { receiverRemoveResult, senderRemoveResult } = await this._userReposatry.removeFromUserRelations(
            senderID,
            receiverID,
            USER_FIELDS.FRIEND_REQUESTS,
            USER_FIELDS.SENT_REQUESTS
        );
        if (!receiverRemoveResult || !senderRemoveResult) throw AccepttFollowRequestFail();
        return FOLLOW_MESSAGE.REMOVE.SUCCESS

    }
}