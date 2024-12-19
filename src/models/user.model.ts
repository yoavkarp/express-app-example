import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { UserRole, UserRoles } from "../interfaces/user.interface";


@modelOptions({
    schemaOptions: {
        timestamps: true, // Enable timestamps
        versionKey: false,
    }
})

class UserClass {

    @prop({ type: String, required: true })
    public name!: string;

    @prop({ type: String, required: true, unique: true })
    public phone_number!: string;

    @prop({ type: String })
    public email?: string;

    // todo: fix this field
    @prop({ type: [String], enum: UserRoles, required: true, default: ['user'] })
    public roles!: UserRole[];

    @prop({ type: Date, default: () => new Date() })
    public createdAt!: Date;

    @prop({ type: Date, default: () => new Date() })
    public updatedAt!: Date;

}


export const UserModel = getModelForClass(UserClass);