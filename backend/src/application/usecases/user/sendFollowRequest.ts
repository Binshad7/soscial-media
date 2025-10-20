import { UserRepository } from "../../../infrastructure/repositories/UserRepositoryImpl";
import { COMMON_MESSAGES } from "../../../constants/messages/commonMessages";
import { HTTP_STATUS } from "../../../constants/StatusCodes";
import { AppError } from "../../../domain/errors/AppError";
import { FOLLOW_MESSAGE } from "../../../constants/messages/userMessages";

export class sendFollowRequest {
    constructor(private userReposatry: UserRepository) { }
    async execute(senderID: string | undefined, receiverID: string) {
        try {
            // validation
            if (!senderID || !receiverID) throw new AppError(FOLLOW_MESSAGE.SEND_REQUST_FAILD, HTTP_STATUS.BAD_REQUEST);
            if (senderID === receiverID) throw new AppError(FOLLOW_MESSAGE.SEND_REQUST_SELF_FOLLOW, HTTP_STATUS.BAD_REQUEST);
            //find reciver user valid
            const reciverUserExistCheck = await this.userReposatry.findById(receiverID);
            if (!reciverUserExistCheck) throw new AppError(FOLLOW_MESSAGE.RECIVER_NOT_FOUND, HTTP_STATUS.BAD_REQUEST);
            // send Request to userId and 
            const requstSended = await this.userReposatry.sendFollowRequset(senderID, receiverID);
            // if (!requstSended.receiverResult || !requstSended.senderResult) throw new AppError(FOLLOW_MESSAGE.SEND_REQUST_FAILD, HTTP_STATUS.INTERNAL_SERVER_ERROR)
            return { message: FOLLOW_MESSAGE.FOLLOW_REQUEST_SEND }
        } catch (error: any) {
            console.error(error.message)
            throw new AppError(COMMON_MESSAGES.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    }
}  