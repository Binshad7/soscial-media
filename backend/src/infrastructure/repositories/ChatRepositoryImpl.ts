import ChatModel from "../db/mongoose/ChatModel";
import { IChat, IMessage } from "../../domain/entities/Chat";

export class ChatRepository {
    async addMessage(chatId: string, message: IMessage) {
        return ChatModel.findByIdAndUpdate(
            chatId,
            { $push: { messages: message } },
            { new: true }
        );
    }
    async createChat(chat: IChat) {
        return ChatModel.create(chat);
    }
    async findChatById(id: string) {
        return ChatModel.findById(id);
    }
}