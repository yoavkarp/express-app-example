import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UsersService } from '@/services/users.service';
import { OtpService } from '@/services/otp.service';

passport.use(
    'otp',
    new LocalStrategy(
        { usernameField: 'phone_number', passwordField: 'otp', passReqToCallback: true },
        async (req, phone_number: string, otp: string, done) => {
            let usersService = new UsersService();
            let otpService = new OtpService();
            try {
                await otpService.verifyOtp(phone_number, otp);
                await otpService.deleteOtp(phone_number);
                const user = await usersService.findUserByPhoneNumber(phone_number);
                return done(null, user);
            }
            catch (e: any) {
                return done(null, false, { message: e.message });
            }
        }
    )
);

passport.use('atarix', new LocalStrategy({ usernameField: 'atarix_token' },
    (atarix_token, _, done) => {

    }))

passport.serializeUser((user: any, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (userId: string, done) => {
    let usersService = new UsersService();
    const user = await usersService.getUserById(userId);
    done(null, user || false);
});