import express from 'express';
import { Router } from './router';
import Http from 'http';
import { errorMiddleware } from './middleware/error.middleware';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UsersService } from './services/users.service';
import { OtpService } from './services/otp.service';

export class App {

    readonly app: express.Express;
    private server: Http.Server | null = null;

    constructor(routers: Router[]) {
        this.app = express();
        this.app.use(express.json({ limit: '10kb' }));
        this.app.use(express.urlencoded({ extended: true }));

        // cookie parser
        this.app.use(cookieParser());

        // logger
        this.app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev', { skip: (req, res) => { return res.statusCode < 400 } }));

        // helmet
        this.app.use(helmet({ xPoweredBy: false }));
        this.app.use(helmet.contentSecurityPolicy({
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'"],
            },
        }))

        // rate limiter
        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // limit each IP to 100 requests per windowMs
        });
        if (process.env.NODE_ENV === 'production') {
            this.app.use(limiter);

            if (!process.env.SESSION_SECRET) {
                console.error('SESSION_SECRET is required in production environment');
                process.exit(1);
            }
        }

        // session
        this.app.use(
            session({
                secret: process.env.SESSION_SECRET || 'your-secret-key',
                resave: false,
                saveUninitialized: true
            })
        );

        // passport
        this.app.use(passport.initialize());
        this.app.use(passport.session());

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

        passport.serializeUser((user: any, done) => {
            console.log("USER", user);
            done(null, user._id);
        });

        passport.deserializeUser(async (phone_number: string, done) => {
            let usersService = new UsersService();
            const user = await usersService.findUserByPhoneNumber(phone_number);
            done(null, user || false);
        });

        // load routers
        routers.forEach(r => this.app.use(r.path, r.router))

        // error middleware
        this.app.use(errorMiddleware);
    }

    listen() {
        if (this.server) {
            console.error('Server already running');
            return;
        }
        this.server = this.app.listen(process.env.PORT || 3000, () => {
            console.log('Server is running on port', process.env.PORT || 3000);
        });
    }

    close(callback?: () => void) {
        this.server?.close(callback);
    }
}