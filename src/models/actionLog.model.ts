import { getModelForClass, modelOptions, prop, Severity } from "@typegoose/typegoose";
import { ActionLogType } from "../interfaces/actionLog.interface";


@modelOptions({
    schemaOptions: {
        versionKey: false,
        _id: false
    },
})
class UpdateActionLogChangeClass {
    @prop({ type: String, required: true })
    key!: string;

    @prop({ type: String, required: true })
    prev!: string;

    @prop({ type: String, required: true })
    next!: string;
}

@modelOptions({
    schemaOptions: {
        timestamps: {
            updatedAt: false,
            createdAt: true
        }, // Enable timestamps
        versionKey: false
    }
})
class ActionLogClass {

    @prop({ type: String, required: true, index: 1 })
    public userId!: string;

    @prop({ type: String, required: true })
    public type!: ActionLogType;

    @prop({ type: String, required: true, index: 1 })
    public entity!: string;

    @prop({ type: String, required: true, index: 1 })
    public entityId!: string;

    @prop({ type: () => [UpdateActionLogChangeClass], default: undefined })
    public changes?: UpdateActionLogChangeClass[];

    @prop({ type: Date, default: () => new Date() })
    public createdAt!: Date;

}

export const ActionLogModel = getModelForClass(ActionLogClass);