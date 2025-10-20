import VideoCallModel from "../db/mongoose/models/VideoCallModel";
import { IVideoCall } from "../../domain/entities/VideoCall";

export class VideoCallRepository {
    async createCall(data: IVideoCall) {
        return VideoCallModel.create(data);
    }
    async findByRoomId(roomId: string) {
        return VideoCallModel.findOne({ roomId });
    }
    async endCall(roomId: string) {
        return VideoCallModel.findOneAndUpdate(
            { roomId },
            { status: "ended", endedAt: new Date() },
            { new: true }
        );
    }
}