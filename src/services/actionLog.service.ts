import { HttpError } from "../errors/http.error";
import { UserModel } from "../models/user.model";
import { User } from "../interfaces/user.interface";
import { CreateUserInput, UpdateUserInput } from "../validators/users.validators";
import { ActionLogModel } from "../models/actionLog.model";
import { ActionLogType, UpdateActionLogChange } from "../interfaces/actionLog.interface";

export class ActionLogService {
    public async create<T extends ActionLogType, D extends Record<string, any>>(userId: string, entity: string, entityId: string, type: T, prev?: D, next?: D) {

        let changes = (type === ActionLogType.UPDATE && prev && next) ? (
            Object.keys(prev || {}).reduce<UpdateActionLogChange[]>((acc, key) => {
                if (prev[key] !== next[key]) {
                    return [...acc, {
                        key: key,
                        prev: prev[key],
                        next: next[key]
                    }]
                }
                return acc;
            }, [])
        ) : undefined

        console.log(prev, next);

        await ActionLogModel.create({
            userId,
            entity,
            entityId,
            type,
            changes: (changes?.length || 0) > 0 ? changes : undefined
        })
    }
}