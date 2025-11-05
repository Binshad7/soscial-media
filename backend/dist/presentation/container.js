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
const RegisterUser_1 = require("../application/usecases/user/RegisterUser");
const LoginUser_1 = require("../application/usecases/user/LoginUser");
// Follow
const AcceptFollowRequest_1 = require("../application/usecases/user/AcceptFollowRequest");
const RejectFollowRequest_1 = require("../application/usecases/user/RejectFollowRequest");
const SendFollowRequest_1 = require("../application/usecases/user/SendFollowRequest");
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
const registerUser = new RegisterUser_1.RegisterUser(userRepository);
const loginUser = new LoginUser_1.LoginUser(userRepository);
const sendFollowReq = new SendFollowRequest_1.sendFollowRequest(userRepository);
const acceptFollowReq = new AcceptFollowRequest_1.AccepttFollowRequest(userRepository);
const rejectFollowReq = new RejectFollowRequest_1.RejectFollowRequest(userRepository);
const sendMessage = new SendMessage_1.SendMessage(chatRepository);
const createGroup = new CreateGroup_1.CreateGroup(groupRepository);
const startVideoCall = new StartVideoCall_1.StartVideoCall(videoCallRepository);
// Controllers
exports.userController = new UserController_1.UserController(registerUser, loginUser, sendFollowReq, acceptFollowReq, rejectFollowReq);
exports.chatController = new ChatController_1.ChatController(sendMessage);
exports.groupController = new GroupController_1.GroupController(createGroup);
exports.videoCallController = new VideoCallController_1.VideoCallController(startVideoCall);
