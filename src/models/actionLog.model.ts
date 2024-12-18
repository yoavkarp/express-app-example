import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { ActionLogType, UpdateActionLogChange } from "../interfaces/actionLog.interface";


@modelOptions({
    schemaOptions: {
        timestamps: {
            updatedAt: false,
            createdAt: true
        }, // Enable timestamps
        versionKey: false
    },
})
class ActionLogClass {

    @prop({ type: String, required: true })
    public userId!: string;

    @prop({ type: String, required: true })
    public type!: ActionLogType;

    @prop({ type: String, required: true })
    public entity!: string;

    @prop({ type: String, required: true })
    public entityId!: string;

    @prop({ type: Array<UpdateActionLogChange>, default: undefined })
    public changes?: UpdateActionLogChange[];

    @prop({ type: Date, default: () => new Date() })
    public createdAt!: Date;
}

export const ActionLogModel = getModelForClass(ActionLogClass);