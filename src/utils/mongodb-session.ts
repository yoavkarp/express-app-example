import session, { SessionData } from 'express-session';
import { SessionModel } from '../models/session.model'

export class MongooseStore extends session.Store {

    private sessionModel = SessionModel;

    async get(sessionId: string, callback: (err: any, session?: SessionData | null) => void) {
        try {
            const session = await this.sessionModel.findOne({ sessionId });
            callback(null, session ? session.sessionData : null);
        } catch (error) {
            callback(error);
        }
    }

    async set(sessionId: string, sessionData: SessionData, callback: (err?: any) => void) {
        try {
            const expires = new Date(Date.now() + sessionData.cookie.maxAge!);
            await this.sessionModel.updateOne(
                { sessionId },
                { sessionId, sessionData, expires },
                { upsert: true }
            );
            callback(null);
        } catch (error) {
            callback(error);
        }
    }

    async destroy(sessionId: string, callback: (err?: any) => void) {
        try {
            await this.sessionModel.deleteOne({ sessionId });
            callback(null);
        } catch (error) {
            callback(error);
        }
    }
}
