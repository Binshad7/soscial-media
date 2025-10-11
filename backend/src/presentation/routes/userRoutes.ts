import { Router } from "express";
import { UserRepository } from "../../infrastructure/repositories/UserRepositoryImpl";
import { UserController } from "../controllers/UserController";


import { RegisterUser } from "../../application/usecases/user/RegisterUser";
import { LoginUser } from "../../application/usecases/user/LoginUser"; 

const router = Router();
const userRepository = new UserRepository();  // mongodb layer all db opretion in side of that
const registerUser = new RegisterUser(userRepository);
const loginUser = new LoginUser(userRepository);
const userController = new UserController(registerUser, loginUser);

router.post("/register", userController.register);
router.post("/login", userController.login);

export default router;