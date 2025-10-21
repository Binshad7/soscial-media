import { UserRepository } from "../../../infrastructure/repositories/UserRepositoryImpl";
import { HTTP_STATUS } from "../../../constants/StatusCodes";
import { AppError } from "../../../domain/errors/AppError";
import { FOLLOW_MESSAGE } from "../../../constants/messages/ResponseMessages";

export class sendFollowRequest {
    constructor(private userReposatry: UserRepository) { }
    async execute(senderID: string | undefined, receiverID: string) {
        try {
            // validation
            if (!senderID || !receiverID) throw new AppError(FOLLOW_MESSAGE.REQUEST.SEND_FAILED, HTTP_STATUS.BAD_REQUEST);
            if (senderID === receiverID) throw new AppError(FOLLOW_MESSAGE.REQUEST.SELF_FOLLOW, HTTP_STATUS.BAD_REQUEST);
            //find reciver user valid
            const reciverUserExistCheck = await this.userReposatry.findById(receiverID);
            if (!reciverUserExistCheck) throw new AppError(FOLLOW_MESSAGE.REQUEST.RECEIVER_NOT_FOUND, HTTP_STATUS.BAD_REQUEST);
            // send Request to userId and 
            const { f1, f2 } = await this.userReposatry.sendFollowRequset(senderID, receiverID);
            if (!f1.modifiedCount || !f2.modifiedCount) throw new AppError(FOLLOW_MESSAGE.REQUEST.SEND_FAILED, HTTP_STATUS.INTERNAL_SERVER_ERROR)
            return { message: FOLLOW_MESSAGE.REQUEST.SEND_SUCCESS }
        } catch (error: any) {
            console.error(error.message)
            throw error
        }
    }
}  