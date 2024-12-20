import { MongooseStore } from '@/utils/mongodb-session';
import expressSession from 'express-session';

export const sessionMiddleware = expressSession({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: new MongooseStore(),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 60, // 2 month
    }
})