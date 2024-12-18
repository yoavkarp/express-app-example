import express from 'express';
import passport from 'passport';
import { Router } from './router';
import Http from 'http';
import { errorMiddleware } from './middleware/error.middleware';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import csrf from 'csrf'

export class App {

    readonly app: express.Express;
    private server: Http.Server | null = null;

    constructor(routers: Router[]) {
        this.app = express();
        this.app.use(express.json({ limit: '10kb' }));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev', { skip: (req, res) => { return res.statusCode < 400 } }));

        // this.app.use(passport.initialize());
        // this.app.use(passport.session());

        // load routers
        routers.forEach(r => this.app.use(r.path, r.router))

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

    close() {
        this.server?.close((err) => {
            if (process.env.NODE_ENV === 'test') return;
            if (err) {
                console.error(err);
                return;
            }
            console.log('Server closed');
        });
    }
}