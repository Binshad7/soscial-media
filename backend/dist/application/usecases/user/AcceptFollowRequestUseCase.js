"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccepttFollowRequestUseCase = void 0;
const ResponseMessages_1 = require("../../../constants/messages/ResponseMessages");
const errors_1 = require("../../../shared/helpers/errors");
const fieldNames_1 = require("../../../constants/fieldNames");
class AccepttFollowRequestUseCase {
    constructor(_userReposatry) {
        this._userReposatry = _userReposatry;
    }
    async execute(senderID, receiverID) {
        if (!senderID || !receiverID)
            throw (0, errors_1.AccepttFollowRequestFail)();
        if (senderID === receiverID)
            throw (0, errors_1.CannotFollowSelf)();
        const reciverUserExistCheck = await this._userReposatry.findById(receiverID);
        if (!reciverUserExistCheck)
            throw (0, errors_1.UserNotFound)();
        const { receiverRemoveResult, senderRemoveResult } = await this._userReposatry.removeFromUserRelations(senderID, receiverID, fieldNames_1.USER_FIELDS.FRIEND_REQUESTS, fieldNames_1.USER_FIELDS.SENT_REQUESTS);
        if (!receiverRemoveResult || !senderRemoveResult)
            throw (0, errors_1.AccepttFollowRequestFail)();
        const { receiverUpdateResult, senderUpdateResult } = await this._userReposatry.addUserRelations(senderID, receiverID, fieldNames_1.USER_FIELDS.FOLLOWING, fieldNames_1.USER_FIELDS.FOLLOWERS);
        if (!receiverUpdateResult || !senderUpdateResult)
            throw (0, errors_1.AccepttFollowRequestFail)();
        return ResponseMessages_1.FOLLOW_MESSAGE.ACCEPT.SUCCESS;
    }
}
exports.AccepttFollowRequestUseCase = AccepttFollowRequestUseCase;
