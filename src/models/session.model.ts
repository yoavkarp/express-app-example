import { getModelForClass, modelOptions, mongoose, prop, Severity } from "@typegoose/typegoose";
import { SessionData } from "express-session";
import { ObjectId } from "mongoose";


@modelOptions({
    schemaOptions: {
        versionKey: false,
        _id: false
    },
})


@modelOptions({
    schemaOptions: {
        versionKey: false,
        timestamps: {
            createdAt: true,
            updatedAt: false
        },
    },
    options: {
        allowMixed: Severity.ALLOW
    }
})
class SessionClass {
    @prop({ type: String, required: true })
    sessionId!: string;

    @prop({ type: mongoose.Schema.Types.Mixed, required: true })
    sessionData!: SessionData;

    @prop({ type: Date, required: true, default: () => new Date(Date.now() + 1000 * 60 * 60 * 24 * 60) }) // 2 months
    expires!: Date;

    @prop({ type: Date, required: true, default: () => new Date() })
    createdAt!: Date;
}

export const SessionModel = getModelForClass(SessionClass);