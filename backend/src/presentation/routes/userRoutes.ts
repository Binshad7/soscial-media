import { Router } from "express";
import { userController } from "../container";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();


router.post("/register", userController.register);
router.post("/login", userController.login);
router.patch('/sendRequest/:reciverID', authMiddleware, userController.sendFollowRequest);
// router.patch('/acceptRequest/:userId', authMiddleware, (req, res) => { });
// router.get('/getRequests', authMiddleware, (req, res) => { });
// router.get('/getFriends', authMiddleware, (req, res) => { });
// router.get('/searchUsers', authMiddleware, (req, res) => { });

export default router;