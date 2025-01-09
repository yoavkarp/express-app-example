import { RequestHandler } from "express";
import { ActionLogService } from "../services/actionLog.service";
import jwt from 'jsonwebtoken';
import { auth } from "../auth/auth";
import { OtpService } from "../services/otp.service";
import { loginInputSchema, verifyOtpInputSchema } from "../validators/auth.validators";


export class AuthController {

    private ActionLogService: ActionLogService;
    private OtpService: OtpService;

    constructor() {
        this.ActionLogService = new ActionLogService();
        this.OtpService = new OtpService();
    }

    loginWithPhoneNumber: RequestHandler = async (req, res) => {
        const validate = loginInputSchema.safeParse(req.body);
        if (!validate.success) {
            res.status(400).json({
                message: 'Validation failed',
                errors: validate.error.errors
            });
            return;
        }

        try {
            const otp = await this.OtpService.createOtpForUser(validate.data.phone_number);
            res.json({
                message: 'Otp sent'
            });
        }
        catch (e: any) {
            res.status(400).json({
                message: e.message
            });
        }

    }

    verifyOtp: RequestHandler = async (req, res, next) => {
        const validate = verifyOtpInputSchema.safeParse(req.body);
        if (!validate.success) {
            res.status(400).json({
                message: 'Validation failed',
                errors: validate.error.errors
            });
            return;
        }

        const verify = await this.OtpService.verifyOtp(validate.data.phone_number, validate.data.otp);
        const accessToken = auth.generateAccessToken(verify.userId);
        const refreshToken = auth.generateRefreshToken(verify.userId);
        res.status(200).json({ message: 'Logged in successfully', accessToken, refreshToken });

    }

    getSession: RequestHandler = async (req, res) => {
        res.json({
            user: req.user
        })
    }
}