"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupController = void 0;
class GroupController {
    constructor(createGroup) {
        this.createGroup = createGroup;
        this.create = async (req, res) => {
            try {
                const group = await this.createGroup.execute(req.body);
                res.status(201).json(group);
            }
            catch (e) {
                res.status(400).json({ error: e.message });
            }
        };
    }
}
exports.GroupController = GroupController;
