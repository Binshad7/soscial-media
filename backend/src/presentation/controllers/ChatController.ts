import { Request, Response } from "express";
import { SendMessage } from "../../application/usecases/chat/SendMessage";

export class ChatController {
    constructor(private sendMessage: SendMessage) { }

    send = async (req: Request, res: Response) => {
        try {
            const { chatId, message } = req.body;
            const chat = await this.sendMessage.execute(chatId, message);
            res.status(200).json(chat);
        } catch (e: any) {
            res.status(400).json({ error: e.message });
        }
    };
}