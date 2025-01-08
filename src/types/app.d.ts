import 'express-session';

declare module 'express-session' {
    interface SessionData {
        cookie: SessionData['cookie']
        passport: {
            userId: string
        }
    }
}