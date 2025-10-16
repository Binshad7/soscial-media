"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRepository = void 0;
const ChatModel_1 = __importDefault(require("../db/mongoose/ChatModel"));
class ChatRepository {
    async addMessage(chatId, message) {
        return ChatModel_1.default.findByIdAndUpdate(chatId, { $push: { messages: message } }, { new: true });
    }
    async createChat(chat) {
        return ChatModel_1.default.create(chat);
    }
    async findChatById(id) {
        return ChatModel_1.default.findById(id);
    }
}
exports.ChatRepository = ChatRepository;
