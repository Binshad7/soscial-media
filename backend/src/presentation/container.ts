// Dependency Injection Container
// This centralizes all dependency wiring for better testability and maintainability
import { UserRepository } from "../infrastructure/repositories/UserRepositoryImpl";
import { ChatRepository } from "../infrastructure/repositories/ChatRepositoryImpl";
import { GroupRepository } from "../infrastructure/repositories/GroupRepositoryImpl";
import { VideoCallRepository } from "../infrastructure/repositories/VideoCallRepositoryImpl";

// Usecases
import { RegisterUserUseCase } from "../application/usecases/user/RegisterUserUseCase";
import { LoginUserUseCase } from "../application/usecases/user/LoginUserUseCase";
// Follow

import { AccepttFollowRequestUseCase } from "../application/usecases/user/AcceptFollowRequestUseCase";
import { RejectFollowRequestUseCase } from "../application/usecases/user/RejectFollowRequestUseCase";
import { SendFollowRequestUseCase } from "../application/usecases/user/SendFollowRequestUseCase";
// messages
import { SendMessage } from "../application/usecases/chat/SendMessage";
import { CreateGroup } from "../application/usecases/group/CreateGroup";
import { StartVideoCall } from "../application/usecases/call/StartVideoCall";

// Controllers
import { UserController } from "./controllers/UserController";
import { ChatController } from "./controllers/ChatController";
import { GroupController } from "./controllers/GroupController";
import { VideoCallController } from "./controllers/VideoCallController";
// Repositories
const userRepository = new UserRepository();
const chatRepository = new ChatRepository();
const groupRepository = new GroupRepository();
const videoCallRepository = new VideoCallRepository();

// Usecases
const registerUser = new RegisterUserUseCase(userRepository);
const loginUser = new LoginUserUseCase(userRepository);
const sendFollowReq = new SendFollowRequestUseCase(userRepository);
const acceptFollowReq = new AccepttFollowRequestUseCase(userRepository);
const rejectFollowReq = new RejectFollowRequestUseCase(userRepository);


const sendMessage = new SendMessage(chatRepository);
const createGroup = new CreateGroup(groupRepository);
const startVideoCall = new StartVideoCall(videoCallRepository);

// Controllers
export const userController = new UserController(registerUser, loginUser, sendFollowReq, acceptFollowReq, rejectFollowReq);
export const chatController = new ChatController(sendMessage);
export const groupController = new GroupController(createGroup);
export const videoCallController = new VideoCallController(startVideoCall);