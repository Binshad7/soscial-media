import { Router } from "express";
import { GroupRepository } from "../../infrastructure/repositories/GroupRepositoryImpl";
import { CreateGroup } from "../../application/usecases/group/CreateGroup";
import { GroupController } from "../controllers/GroupController";

const router = Router();
const groupRepository = new GroupRepository();
const createGroup = new CreateGroup(groupRepository);
const groupController = new GroupController(createGroup);

router.post("/create", groupController.create);

export default router;