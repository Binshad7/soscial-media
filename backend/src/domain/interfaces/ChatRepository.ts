import { IChat, IMessage } from "../entities/Chat";

export interface IChatRepository {
  createChat(chat: IChat): Promise<IChat>;
  findChatById(id: string): Promise<IChat | null>;
  addMessage(chatId: string, message: IMessage): Promise<IChat | null>;
}