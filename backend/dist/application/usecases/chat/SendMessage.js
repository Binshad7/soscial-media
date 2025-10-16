"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMessage = void 0;
class SendMessage {
    constructor(chatRepository) {
        this.chatRepository = chatRepository;
    }
    async execute(chatId, message) {
        return this.chatRepository.addMessage(chatId, message);
    }
}
exports.SendMessage = SendMessage;
