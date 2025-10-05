import { Request, Response } from "express";
import { CreateGroup } from "../../application/usecases/group/CreateGroup";

export class GroupController {
    constructor(private createGroup: CreateGroup) { }

    create = async (req: Request, res: Response) => {
        try {
            const group = await this.createGroup.execute(req.body);
            res.status(201).json(group);
        } catch (e: any) {
            res.status(400).json({ error: e.message });
        }
    };
}