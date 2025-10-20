import { UserRepository } from "../infrastructure/repositories/UserRepositoryImpl";
import { UserController } from "./controllers/UserController";


import { RegisterUser } from "../application/usecases/user/RegisterUser";
import { LoginUser } from "../application/usecases/user/LoginUser";

import { sendFollowRequest } from "../application/usecases/user/sendFollowRequest";

const userRepository = new UserRepository();  // mongodb layer all db opretion in side of that
const registerUser = new RegisterUser(userRepository);
const loginUser = new LoginUser(userRepository);
const sendFolloReq = new sendFollowRequest(userRepository);

export const userController = new UserController(registerUser, loginUser, sendFolloReq);
