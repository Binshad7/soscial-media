import { Router } from "express";
import { ChatRepository } from "../../infrastructure/repositories/ChatRepositoryImpl";
import { SendMessage } from "../../application/usecases/chat/SendMessage";
import { ChatController } from "../controllers/ChatController";

const router = Router();
const chatRepository = new ChatRepository();
const sendMessage = new SendMessage(chatRepository);
const chatController = new ChatController(sendMessage);

router.post("/send", chatController.send);

export default router;