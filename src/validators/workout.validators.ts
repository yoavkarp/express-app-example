import { z } from "zod";
import { validateObjectId } from "./objectId.validator";

export const createWorkoutSchema = z.object({
    name: z.string().min(1).max(255),
    notes: z.string().min(3).max(255).optional(),
    writerId: validateObjectId,
    readerId: validateObjectId,
})

export type CreateWorkoutInput = z.infer<typeof createWorkoutSchema>;

export const updateWorkoutSchema = z.object({
    name: z.string().min(1).max(255).optional(),
    notes: z.string().min(3).max(255).optional(),
})

export type UpdateWorkoutInput = z.infer<typeof updateWorkoutSchema>;