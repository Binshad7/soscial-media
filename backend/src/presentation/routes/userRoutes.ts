import { Router } from "express";
import { UserRepository } from "../../infrastructure/repositories/UserRepositoryImpl";
import { UserController } from "../controllers/UserController";


import { RegisterUser } from "../../application/usecases/user/RegisterUser";
import { LoginUser } from "../../application/usecases/user/LoginUser";

import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const userRepository = new UserRepository();  // mongodb layer all db opretion in side of that
const registerUser = new RegisterUser(userRepository);
const loginUser = new LoginUser(userRepository);
const userController = new UserController(registerUser, loginUser);

router.post("/register", userController.register);
router.post("/login", userController.login);
router.patch('/sendRequest/:userId', authMiddleware, UserController.);
// router.patch('/acceptRequest/:userId', authMiddleware, (req, res) => { });
// router.get('/getRequests', authMiddleware, (req, res) => { });
// router.get('/getFriends', authMiddleware, (req, res) => { });
// router.get('/searchUsers', authMiddleware, (req, res) => { });

export default router;