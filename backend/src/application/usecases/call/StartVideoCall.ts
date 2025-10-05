import { IVideoCall } from "../../../domain/entities/VideoCall";
import { VideoCallRepository } from "../../../infrastructure/repositories/VideoCallRepositoryImpl";

export class StartVideoCall {
  constructor(private callRepository: VideoCallRepository) {}

  async execute(callData: IVideoCall) {
    return this.callRepository.createCall(callData);
  }
}