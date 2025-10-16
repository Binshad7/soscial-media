"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
class ChatController {
    constructor(sendMessage) {
        this.sendMessage = sendMessage;
        this.send = async (req, res) => {
            try {
                const { chatId, message } = req.body;
                const chat = await this.sendMessage.execute(chatId, message);
                res.status(200).json(chat);
            }
            catch (e) {
                res.status(400).json({ error: e.message });
            }
        };
    }
}
exports.ChatController = ChatController;
