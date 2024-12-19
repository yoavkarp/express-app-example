import { getModelForClass, modelOptions, mongoose, prop } from "@typegoose/typegoose";
import { ObjectId } from "mongoose";

@modelOptions({
    schemaOptions: {
        versionKey: false,
        timestamps: {
            createdAt: true,
            updatedAt: false
        }
    },
})
class OtpClass {
    @prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User', unique: true })
    userId!: ObjectId;

    @prop({ type: String, required: true, match: /^[0-9]{6}$/, immutable: true })
    code!: Readonly<string>;

    @prop({ type: String, required: true, unique: true })
    phone_number!: string;

    @prop({ type: Date, required: true, default: () => new Date() })
    createdAt!: Date;
}

export const OtpModel = getModelForClass(OtpClass);