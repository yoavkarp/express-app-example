import express from 'express';
import { Router } from './router';
import Http from 'http';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UsersService } from './services/users.service';
import { OtpService } from './services/otp.service';

import { sessionMiddleware } from '@/middleware/session.middleware'
import { limiterMiddleware } from '@/middleware/rateLimiter.middleware';
import { corsMiddleware } from '@/middleware/cors.middleware';
import { errorMiddleware } from './middleware/error.middleware';

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
        this.app.use(helmet({
            xPoweredBy: false,
            noSniff: false,
            frameguard: { action: 'deny' },
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    scriptSrc: ["'self'"],
                    objectSrc: ["'none'"],
                    upgradeInsecureRequests: [],
                },
            },
            hsts: {
                maxAge: 31536000, // 1 year
                includeSubDomains: true, // Apply to subdomains
                preload: true,
            },
            referrerPolicy: { policy: 'no-referrer' },
            permittedCrossDomainPolicies: { permittedPolicies: 'none' }
        }));


        // rate limiter
        if (process.env.NODE_ENV === 'production') {
            this.app.use(limiterMiddleware);
            this.app.use(corsMiddleware);

            if (!process.env.SESSION_SECRET) {
                console.error('SESSION_SECRET is required in production environment');
                process.exit(1);
            }
        }

        // session
        this.app.use(sessionMiddleware);

        // passport
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.setupAuth();

        // load routers
        routers.forEach(r => {
            this.app.use(r.path, r.router)
            console.log(`Router loaded: ${r.path}`);
        })

        // error middleware
        this.app.use(errorMiddleware);
    }

    listen() {
        if (this.server) {
            console.error('Server already running');
            return;
        }
        this.server = this.app.listen(process.env.PORT || 3000, () => {
            console.log(process.env.NODE_ENV, 'Server is running on port', process.env.PORT || 3000);
        });

        process.on('SIGINT', () => {
            this.server?.close(() => console.log("Server closed"));
            process.exit(0); // Exit the process with a success code.
        });
    }

    close(callback?: () => void) {
        this.server?.close(callback);
    }

    setupAuth() {
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
            done(null, user._id);
        });

        passport.deserializeUser(async (userId: string, done) => {
            let usersService = new UsersService();
            const user = await usersService.getUserById(userId);
            done(null, user || false);
        });
    }
}