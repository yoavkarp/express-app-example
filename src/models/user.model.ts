import { getModelForClass, modelOptions, prop, PropType, Severity } from "@typegoose/typegoose";
import { UserRole } from "../interfaces/user.interface";


@modelOptions({
    schemaOptions: {
        timestamps: true, // Enable timestamps
        versionKey: false,
    },
    options: {
        allowMixed: Severity.ALLOW
    }
})
class UserClass {

    @prop({ type: String, required: true })
    public name!: string;

    @prop({ type: String, required: true, unique: true })
    public phone_number!: string;

    @prop({ type: String })
    public email?: string;

    @prop({ type: Array<UserRole>, required: true, default: [UserRole.USER] })
    public roles!: UserRole[];

    @prop({ type: Date, default: () => new Date() })
    public createdAt!: Date;

    @prop({ type: Date, default: () => new Date() })
    public updatedAt!: Date;

}

export const UserModel = getModelForClass(UserClass);