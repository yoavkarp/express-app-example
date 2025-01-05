import { RequestHandler } from "express";
import { IUser } from "../interfaces/user.interface";
import { HttpError } from "../errors/http.error";
import { ActionLogService } from "../services/actionLog.service";
import { ActionLogType } from "../interfaces/actionLog.interface";
import { validateObjectId } from "../validators/objectId.validator";
import { loginInputSchema, verifyOtpInputSchema } from "@/validators/auth.validators";
import { OtpService } from "@/services/otp.service";
import passport from "passport";

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

        passport.authenticate('otp', (err: Error | null, user: IUser | null, info: any) => {
            if (err) return next(err);
            if (!user) return res.status(401).json({ message: info.message });
            req.login(user, loginErr => {
                if (loginErr) return next(loginErr);
                res.status(200).json({ message: 'Logged in successfully', user });
            });
        })(req, res, next);

    }

    getSession: RequestHandler = async (req, res) => {
        res.json({
            user: req.user
        })
    }
}