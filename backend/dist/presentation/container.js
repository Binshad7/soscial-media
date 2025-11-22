"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoCallController = exports.groupController = exports.chatController = exports.userController = void 0;
// Dependency Injection Container
// This centralizes all dependency wiring for better testability and maintainability
const UserRepositoryImpl_1 = require("../infrastructure/repositories/UserRepositoryImpl");
const ChatRepositoryImpl_1 = require("../infrastructure/repositories/ChatRepositoryImpl");
const GroupRepositoryImpl_1 = require("../infrastructure/repositories/GroupRepositoryImpl");
const VideoCallRepositoryImpl_1 = require("../infrastructure/repositories/VideoCallRepositoryImpl");
// Usecases
const RegisterUserUseCase_1 = require("../application/usecases/user/RegisterUserUseCase");
const LoginUserUseCase_1 = require("../application/usecases/user/LoginUserUseCase");
// Follow
const AcceptFollowRequestUseCase_1 = require("../application/usecases/user/AcceptFollowRequestUseCase");
const RejectFollowRequestUseCase_1 = require("../application/usecases/user/RejectFollowRequestUseCase");
const SendFollowRequestUseCase_1 = require("../application/usecases/user/SendFollowRequestUseCase");
// messages
const SendMessage_1 = require("../application/usecases/chat/SendMessage");
const CreateGroup_1 = require("../application/usecases/group/CreateGroup");
const StartVideoCall_1 = require("../application/usecases/call/StartVideoCall");
// Controllers
const UserController_1 = require("./controllers/UserController");
const ChatController_1 = require("./controllers/ChatController");
const GroupController_1 = require("./controllers/GroupController");
const VideoCallController_1 = require("./controllers/VideoCallController");
// Repositories
const userRepository = new UserRepositoryImpl_1.UserRepository();
const chatRepository = new ChatRepositoryImpl_1.ChatRepository();
const groupRepository = new GroupRepositoryImpl_1.GroupRepository();
const videoCallRepository = new VideoCallRepositoryImpl_1.VideoCallRepository();
// Usecases
const registerUser = new RegisterUserUseCase_1.RegisterUserUseCase(userRepository);
const loginUser = new LoginUserUseCase_1.LoginUserUseCase(userRepository);
const sendFollowReq = new SendFollowRequestUseCase_1.SendFollowRequestUseCase(userRepository);
const acceptFollowReq = new AcceptFollowRequestUseCase_1.AccepttFollowRequestUseCase(userRepository);
const rejectFollowReq = new RejectFollowRequestUseCase_1.RejectFollowRequestUseCase(userRepository);
const sendMessage = new SendMessage_1.SendMessage(chatRepository);
const createGroup = new CreateGroup_1.CreateGroup(groupRepository);
const startVideoCall = new StartVideoCall_1.StartVideoCall(videoCallRepository);
// Controllers
exports.userController = new UserController_1.UserController(registerUser, loginUser, sendFollowReq, acceptFollowReq, rejectFollowReq);
exports.chatController = new ChatController_1.ChatController(sendMessage);
exports.groupController = new GroupController_1.GroupController(createGroup);
exports.videoCallController = new VideoCallController_1.VideoCallController(startVideoCall);
