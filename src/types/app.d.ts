import 'express-session';
import 'express';

declare global {
    namespace Express {
        interface User {
            [x: string]: any
        }
    }
}

declare module 'express-session' {
    interface SessionData {
        cookie: SessionData['cookie']
        passport: {
            userId: string
        }
    }
}