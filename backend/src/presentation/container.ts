// Dependency Injection Container
// This centralizes all dependency wiring for better testability and maintainability
import { UserRepository } from "../infrastructure/repositories/UserRepositoryImpl";
import { ChatRepository } from "../infrastructure/repositories/ChatRepositoryImpl";
import { GroupRepository } from "../infrastructure/repositories/GroupRepositoryImpl";
import { VideoCallRepository } from "../infrastructure/repositories/VideoCallRepositoryImpl";

// Usecases
import { RegisterUser } from "../application/usecases/user/RegisterUser";
import { LoginUser } from "../application/usecases/user/LoginUser";
// Follow
import { sendFollowRequest } from "../application/usecases/user/sendFollowRequest";
import { AccepttFollowRequest } from "../application/usecases/user/acceptFollowRequest";
import { RejectFollowRequest } from "../application/usecases/user/RejectFollowRequest";
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
const registerUser = new RegisterUser(userRepository);
const loginUser = new LoginUser(userRepository);
const sendFollowReq = new sendFollowRequest(userRepository);
const acceptFollowReq = new AccepttFollowRequest(userRepository);
const rejectFollowReq = new RejectFollowRequest(userRepository);
const sendMessage = new SendMessage(chatRepository);
const createGroup = new CreateGroup(groupRepository);
const startVideoCall = new StartVideoCall(videoCallRepository);

// Controllers
export const userController = new UserController(registerUser, loginUser, sendFollowReq,acceptFollowReq,rejectFollowReq);
export const chatController = new ChatController(sendMessage);
export const groupController = new GroupController(createGroup);
export const videoCallController = new VideoCallController(startVideoCall);

// Export repositories for testing
export const repositories = {
  userRepository,
  chatRepository,
  groupRepository,
  videoCallRepository
};

// Export usecases for testing
export const usecases = {
  registerUser,
  loginUser,
  sendFollowReq,
  sendMessage,
  createGroup,
  startVideoCall
};