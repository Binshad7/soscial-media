"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoCallRepository = void 0;
const VideoCallModel_1 = __importDefault(require("../db/mongoose/VideoCallModel"));
class VideoCallRepository {
    async createCall(data) {
        return VideoCallModel_1.default.create(data);
    }
    async findByRoomId(roomId) {
        return VideoCallModel_1.default.findOne({ roomId });
    }
    async endCall(roomId) {
        return VideoCallModel_1.default.findOneAndUpdate({ roomId }, { status: "ended", endedAt: new Date() }, { new: true });
    }
}
exports.VideoCallRepository = VideoCallRepository;
