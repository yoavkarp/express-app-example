import { HttpError } from "../errors/http.error";
import { UserModel } from "../models/user.model";
import { CreateUserInput, UpdateUserInput } from "../validators/users.validators";
import { OtpModel } from "../models/otp.model";
import { IOtp } from "../interfaces/otp.interface";

const _generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
const generateOTP = () => "123456";

export class OtpService {

    otpModel = OtpModel;
    userModel = UserModel;

    public async createOtpForUser(phone_number: string) {
        const user = await UserModel.exists({ phone_number });
        if (!user) {
            throw new HttpError(400, 'User not found');
        }
        const otp = await OtpModel.create({ phone_number, code: generateOTP(), userId: user._id });
        return otp.toJSON();
    }

    public async verifyOtp(phone_number: string, otp: string) {
        const otpDoc = await OtpModel.findOne({ phone_number, code: otp }).lean<IOtp>();
        if (!otpDoc) {
            throw new HttpError(400, 'Invalid OTP');
        }
        return otpDoc;
    }

    public async deleteOtp(phone_number: string) {
        await OtpModel.findOneAndDelete({ phone_number })
        return true;
    }
}