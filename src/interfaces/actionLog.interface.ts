export enum ActionLogType {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
}

export type UpdateActionLogChange = {
    key: string;
    prev: any;
    next: any;
}

export type UpdateActionLog = {
    type: ActionLogType.UPDATE;
    changes: UpdateActionLogChange[];
}

export type CreateActionLog = {
    type: ActionLogType.CREATE;
}

export type DeleteActionLog = {
    type: ActionLogType.DELETE;
}

export type AnyActionLog = UpdateActionLog | CreateActionLog | DeleteActionLog;

export type IActionLog = {
    userId: string;
    entity: string;
    entityId: string;
} & AnyActionLog;