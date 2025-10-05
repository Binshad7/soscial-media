import { IVideoCall } from "../entities/VideoCall";

export interface IVideoCallRepository {
  createCall(call: IVideoCall): Promise<IVideoCall>;
  findByRoomId(roomId: string): Promise<IVideoCall | null>;
  endCall(roomId: string): Promise<IVideoCall | null>;
}