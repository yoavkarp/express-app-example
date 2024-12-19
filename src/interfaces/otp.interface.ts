import { ObjectId } from "mongoose";

export type Otp = {
    userId: ObjectId;
    phone_number: string;
    code: string;
    createdAt: Date;
}