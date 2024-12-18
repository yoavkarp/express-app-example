import { isValidObjectId, ObjectId } from "mongoose";
import { z } from "zod";

export const validateObjectId = z.custom<ObjectId>((value) => {
    return isValidObjectId(value);
})