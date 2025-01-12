import { HttpError } from "../errors/http.error";
import { UserModel } from "../models/user.model";
import { OtpModel } from "../models/otp.model";
import { IOtp } from "../interfaces/otp.interface";
import jwt from 'jsonwebtoken';

const generateOTP_prod = () => Math.floor(100000 + Math.random() * 900000).toString();
const generateOTP_dev = () => "123456";

let generateOtp: () => string = generateOTP_dev;

if (process.env.NODE_ENV === 'production') {
    generateOtp = generateOTP_prod;
}

export class AuthService {

    otpModel = OtpModel;
    userModel = UserModel;

    private Keys = {
        AccessToken: {
            privateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY!,
            publicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY!
        },
        RefreshToken: {
            privateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY!,
            publicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY!
        }
    }

    public async createOtpForUser(phone_number: string) {
        const user = await UserModel.exists({ phone_number });
        if (!user) {
            throw new HttpError(400, 'User not found');
        }
        const otp = await OtpModel.create({ phone_number, code: generateOtp(), userId: user._id });
        return otp.toJSON();
    }

    public async verifyOtp(phone_number: string, otp: string) {
        const otpDoc = await OtpModel.findOneAndDelete({ phone_number, code: otp }).lean<IOtp>();
        if (!otpDoc) {
            throw new HttpError(400, 'Invalid OTP');
        }
        return otpDoc;
    }

    public generateAccessToken(userId: string, expiresIn: string = '1d') {
        const token = jwt.sign({ id: userId }, this.Keys.AccessToken.privateKey, { expiresIn, algorithm: 'RS256' });
        return token;
    }

    public generateRefreshToken(userId: string, expiresIn: string = '7d') {
        const token = jwt.sign({ id: userId }, this.Keys.RefreshToken.privateKey, { expiresIn, algorithm: 'RS256' });
        return token;
    }

    public verifyAccessKey(token: string) {
        return jwt.verify(token, this.Keys.AccessToken.privateKey, { algorithms: ['RS256'] });
    }

    public verifyRefreshKey(token: string) {
        return jwt.verify(token, this.Keys.RefreshToken.privateKey, { algorithms: ['RS256'] });
    }

    public getKeys() {
        return this.Keys;
    }
}