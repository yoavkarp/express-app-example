import { z } from "zod";
import { validateObjectId } from "./objectId.validator";

const createWorkoutValidator = z.object({
    name: z.string().min(1).max(255),
    notes: z.string().min(3).max(255).optional(),
    writerId: validateObjectId,
    readerId: validateObjectId
})