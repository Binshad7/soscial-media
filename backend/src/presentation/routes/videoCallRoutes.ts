import { Router } from "express";
import { VideoCallRepository } from "../../infrastructure/repositories/VideoCallRepositoryImpl";
import { StartVideoCall } from "../../application/usecases/call/StartVideoCall";
import { VideoCallController } from "../controllers/VideoCallController";

const router = Router();
const videoCallRepository = new VideoCallRepository();
const startVideoCall = new StartVideoCall(videoCallRepository);
const videoCallController = new VideoCallController(startVideoCall);

router.post("/start", videoCallController.start);

export default router;