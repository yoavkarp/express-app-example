import { RequestHandler } from "express";
import { ActionLogService } from "../services/actionLog.service";
import { AuthService } from "../services/auth.service";
import { loginInputSchema, verifyOtpInputSchema } from "../validators/auth.validators";
import { UsersService } from "../services/users.service";


export class AuthController {

    private AuthService: AuthService;
    private UsersService: UsersService;

    constructor() {
        this.AuthService = new AuthService();
        this.UsersService = new UsersService();
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
            const otp = await this.AuthService.createOtpForUser(validate.data.phone_number);
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
        try {
            const verify = await this.AuthService.verifyOtp(validate.data.phone_number, validate.data.otp);
            const accessToken = this.AuthService.generateAccessToken(verify.userId, '1s');
            const refreshToken = this.AuthService.generateRefreshToken(verify.userId, '7d');
            const user = await this.UsersService.getUserById(verify.userId);
            console.log(user);
            res.status(200).json({ message: 'Logged in successfully', accessToken, refreshToken, user });

        }
        catch (e: any) {
            res.status(500).json({ message: e.message });
        }
    }

    refreshToken: RequestHandler = async (req, res) => {
        console.log("refreshing token");
        const accessToken = this.AuthService.generateAccessToken(req.user?._id!);
        const newTokens = {
            accessToken: accessToken,
            refreshToken: this.AuthService.generateRefreshToken(req.user?._id!, '7d'),
            user: req.user
        }
        res.json(newTokens);
    }
}