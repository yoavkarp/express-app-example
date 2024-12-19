import 'express-session';
import { ObjectId } from 'mongoose';

declare module 'express-session' {
    interface SessionData {
        cookie: SessionData['cookie']
        passport: {
            userId: ObjectId
        }
    }
}

export { }