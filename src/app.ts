import express from 'express';
import { Router } from './router';
import Http from 'http';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middleware/error.middleware';
import { Database } from './db/database';
import { helmetMiddleware } from './middleware/helmet.middleware';
import { passport } from './middleware/passport.middleware';
import { corsMiddleware } from './middleware/cors.middleware';
import { limiterMiddleware } from './middleware/rateLimiter.middleware';
import { sessionMiddleware } from './middleware/session.middleware';


export class App {

    readonly app: express.Express;
    public server: Http.Server | null = null;
    readonly database: Database;

    constructor(routers: Router[] = []) {
        this.database = new Database();
        this.app = express();
        this.app.use(express.json({ limit: '10kb' }));
        this.app.use(express.urlencoded({ extended: true }));

        // cookie parser
        this.app.use(cookieParser());

        // logger
        this.app.use(morgan('dev'));

        // helmet
        this.app.use(helmetMiddleware);

        // rate limiter
        if (process.env.NODE_ENV === 'production') {
            console.log("PRODUCTION MODE")
            this.app.use(limiterMiddleware);
            this.app.use(corsMiddleware);
        }

        this.app.use(corsMiddleware);

        // session
        this.app.use(sessionMiddleware);

        // passport
        this.app.use(passport.initialize());
        this.app.use(passport.session());

        // load routers
        routers.forEach(r => {
            this.app.use(r.path, r.router)
            console.log(`Router loaded: ${r.path}`);
        })

        // error middleware
        this.app.use(errorMiddleware);
    }

    async start() {
        if (this.server) {
            console.error('Server already running');
            return;
        }

        await this.database.connect();
        console.log("Database connection established")

        this.server = this.app.listen(process.env.PORT || 3000, () => {
            console.log(process.env.NODE_ENV || "development", 'Server is running on port', process.env.PORT || 3000);
        });

        process.on('SIGINT', (e) => {
            this.close(() => console.log("Server closed"));
            process.exit(0); // Exit the process with a success code.
        });
    }

    async close(callback?: () => void) {
        await this.database.disconnect();
        this.server?.close(callback);
    }
}