import { RequestHandler } from "express";
import { IUser } from "../interfaces/user.interface";
import { UsersService } from "../services/users.service";
import { createUserInputSchema, updateUserInputSchema } from "../validators/users.validators";
import { HttpError } from "../errors/http.error";
import { ActionLogService } from "../services/actionLog.service";
import { ActionLogType } from "../interfaces/actionLog.interface";
import { validateObjectId } from "../validators/objectId.validator";

export class UsersController {

    UsersService: UsersService;
    ActionLogService: ActionLogService;

    constructor() {
        this.UsersService = new UsersService();
        this.ActionLogService = new ActionLogService();
    }

    createUser: RequestHandler = async (req, res) => {
        const validate = createUserInputSchema.safeParse(req.body);
        if (!validate.success) {
            res.status(400).json({
                message: 'Validation failed',
                errors: validate.error.errors
            });
            return;
        }

        const user = await this.UsersService.createUser(validate.data);
        res.json(user);

        this.ActionLogService.create('userId', 'User', user._id.toHexString(), ActionLogType.CREATE);
    }

    updateUser: RequestHandler = async (req, res, next) => {
        const id = req.params.id;
        const isValidId = validateObjectId.safeParse(id);
        if (!isValidId.success) {
            next(new HttpError(400, 'Invalid id'));
            return;
        }
        const validate = updateUserInputSchema.safeParse(req.body);
        if (!validate.success) {
            next(new HttpError(400, `Validation failed: ${validate.error.errors.map((e) => e.message).join(', ')}`));
            return;
        }
        const user = await this.UsersService.updateUser(id, validate.data);
        if (!user) {
            next(new HttpError(400, 'User not found'));
            return;
        }
        res.json(user);

        this.ActionLogService.create('userId', 'User', id, ActionLogType.UPDATE, Object.keys(validate.data).reduce<typeof validate.data>((acc, cur) => {
            acc[cur as keyof typeof acc] = user[cur as keyof typeof acc];
            return acc;
        }, { ...validate.data }), validate.data);

    }

    getUserById: RequestHandler = async (req, res, next) => {
        try {
            const id = req.params.id;
            const user: IUser = await this.UsersService.getUserById(id);
            res.json(user);
        }
        catch (e: any) {
            next(new HttpError(500, e.message));
        }
    }

    deleteUser: RequestHandler = async (req, res) => {
        const id = req.params.id;
        await this.UsersService.deleteUser(id);
        res.json({ message: 'User deleted', id });

        this.ActionLogService.create('userId', 'User', id, ActionLogType.DELETE);
    }
}