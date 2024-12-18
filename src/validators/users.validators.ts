import { IsEmail, IsNotEmpty, MinLength, IsPhoneNumber, IsString, isPhoneNumber } from 'class-validator';
import { z } from 'zod';

export const createUserInputSchema = z.object({
    name: z.string().nonempty(),
    email: z.string().email(),
    phone_number: z.string().refine((value) => isPhoneNumber(value, "IL"))
})

export type CreateUserInput = z.infer<typeof createUserInputSchema>;

export const updateUserInputSchema = z.object({
    name: z.string(),
})

export type UpdateUserInput = z.infer<typeof updateUserInputSchema>;