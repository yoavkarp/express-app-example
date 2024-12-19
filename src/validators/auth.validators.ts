import { isPhoneNumber } from 'class-validator';
import { z } from 'zod';

export const loginInputSchema = z.object({
    phone_number: z.string().refine((value) => isPhoneNumber(value, "IL"), "Invalid phone number")
})

export type LoginInputSchema = z.infer<typeof loginInputSchema>;

export const verifyOtpInputSchema = z.object({
    phone_number: z.string().refine((value) => isPhoneNumber(value, "IL"), "Invalid phone number"),
    otp: z.string().regex(/^[0-9]{6}$/, "Invalid code")
})

export type VerifyOtpInputSchema = z.infer<typeof verifyOtpInputSchema>;