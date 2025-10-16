"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoCallController = void 0;
class VideoCallController {
    constructor(startCall) {
        this.startCall = startCall;
        this.start = async (req, res) => {
            try {
                const call = await this.startCall.execute(req.body);
                res.status(201).json(call);
            }
            catch (e) {
                res.status(400).json({ error: e.message });
            }
        };
    }
}
exports.VideoCallController = VideoCallController;
