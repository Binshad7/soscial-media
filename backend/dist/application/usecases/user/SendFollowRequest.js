"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendFollowRequest = void 0;
const ResponseMessages_1 = require("../../../constants/messages/ResponseMessages");
const errors_1 = require("../../../presentation/helpers/errors");
const fieldNames_1 = require("../../../constants/fieldNames");
class sendFollowRequest {
    constructor(_userReposatry) {
        this._userReposatry = _userReposatry;
    }
    async execute(senderID, receiverID) {
        // validation
        if (!senderID || !receiverID)
            throw (0, errors_1.FollowRequestFaild)();
        if (senderID === receiverID)
            throw (0, errors_1.CannotFollowSelf)();
        //find reciver user valid
        const reciverUserExistCheck = await this._userReposatry.findById(receiverID);
        if (!reciverUserExistCheck)
            throw (0, errors_1.UserNotFound)();
        // send Request to userId and 
        const { receiverUpdateResult, senderUpdateResult } = await this._userReposatry.addUserRelations(senderID, receiverID, fieldNames_1.USER_FIELDS.FRIEND_REQUESTS, fieldNames_1.USER_FIELDS.SENT_REQUESTS);
        if (!receiverUpdateResult.modifiedCount || !senderUpdateResult.modifiedCount)
            throw (0, errors_1.FollowRequestFaild)();
        return { message: ResponseMessages_1.FOLLOW_MESSAGE.REQUEST.SEND_SUCCESS };
    }
}
exports.sendFollowRequest = sendFollowRequest;
