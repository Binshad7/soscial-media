import { IChat, IMessage } from "../../../domain/entities/Chat";
import { ChatRepository } from "../../../infrastructure/repositories/ChatRepositoryImpl";

export class SendMessage {
  constructor(private chatRepository: ChatRepository) {}

  async execute(chatId: string, message: IMessage): Promise<IChat | null> {
    return this.chatRepository.addMessage(chatId, message);
  }
}