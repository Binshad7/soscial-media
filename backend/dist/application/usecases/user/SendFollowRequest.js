"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendFollowRequest = void 0;
const ResponseMessages_1 = require("../../../constants/messages/ResponseMessages");
const errors_1 = require("../../../presentation/helpers/errors");
const loger_1 = require("../../../shared/helpers/loger");
const fieldNames_1 = require("../../../constants/fieldNames");
class sendFollowRequest {
    constructor(userReposatry) {
        this.userReposatry = userReposatry;
    }
    async execute(senderID, receiverID) {
        try {
            // validation
            if (!senderID || !receiverID)
                throw (0, errors_1.FollowRequestFaild)();
            if (senderID === receiverID)
                throw (0, errors_1.CannotFollowSelf)();
            //find reciver user valid
            const reciverUserExistCheck = await this.userReposatry.findById(receiverID);
            if (!reciverUserExistCheck)
                throw (0, errors_1.UserNotFound)();
            // send Request to userId and 
            const { receiverUpdateResult, senderUpdateResult } = await this.userReposatry.addUserRelations(senderID, receiverID, fieldNames_1.USER_FIELDS.FRIEND_REQUESTS, fieldNames_1.USER_FIELDS.SENT_REQUESTS);
            if (!receiverUpdateResult.modifiedCount || !senderUpdateResult.modifiedCount)
                throw (0, errors_1.FollowRequestFaild)();
            return { message: ResponseMessages_1.FOLLOW_MESSAGE.REQUEST.SEND_SUCCESS };
        }
        catch (error) {
            loger_1.logger.error('Follow request failed', {
                error: error.message,
                senderID,
                receiverID
            });
            throw error;
        }
    }
}
exports.sendFollowRequest = sendFollowRequest;
