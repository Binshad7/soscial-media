"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccepttFollowRequest = void 0;
const ResponseMessages_1 = require("../../../constants/messages/ResponseMessages");
const errors_1 = require("../../../presentation/helpers/errors");
const fieldNames_1 = require("../../../constants/fieldNames");
class AccepttFollowRequest {
    constructor(userReposatry) {
        this.userReposatry = userReposatry;
    }
    async execute(senderID, receiverID) {
        try {
            if (!senderID || !receiverID)
                throw (0, errors_1.AccepttFollowRequestFail)();
            if (senderID === receiverID)
                throw (0, errors_1.CannotFollowSelf)();
            const reciverUserExistCheck = await this.userReposatry.findById(receiverID);
            if (!reciverUserExistCheck)
                throw (0, errors_1.UserNotFound)();
            const { receiverRemoveResult, senderRemoveResult } = await this.userReposatry.removeFromUserRelations(senderID, receiverID, fieldNames_1.USER_FIELDS.FRIEND_REQUESTS, fieldNames_1.USER_FIELDS.SENT_REQUESTS);
            if (!receiverRemoveResult || !senderRemoveResult)
                throw (0, errors_1.AccepttFollowRequestFail)();
            const { receiverUpdateResult, senderUpdateResult } = await this.userReposatry.addUserRelations(senderID, receiverID, fieldNames_1.USER_FIELDS.FOLLOWING, fieldNames_1.USER_FIELDS.FOLLOWERS);
            if (!receiverUpdateResult || !senderUpdateResult)
                throw (0, errors_1.AccepttFollowRequestFail)();
            return ResponseMessages_1.FOLLOW_MESSAGE.ACCEPT.SUCCESS;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.AccepttFollowRequest = AccepttFollowRequest;
