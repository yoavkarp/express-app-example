import { ObjectId } from "mongoose";

export type IOtp = {
    userId: ObjectId;
    phone_number: string;
    code: string;
    createdAt: Date;
}