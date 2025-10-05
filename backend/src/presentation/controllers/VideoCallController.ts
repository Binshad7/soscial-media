import { Request, Response } from "express";
import { StartVideoCall } from "../../application/usecases/call/StartVideoCall";

export class VideoCallController {
    constructor(private startCall: StartVideoCall) { }

    start = async (req: Request, res: Response) => {
        try {
            const call = await this.startCall.execute(req.body);
            res.status(201).json(call);
        } catch (e: any) {
            res.status(400).json({ error: e.message });
        }
    };
}