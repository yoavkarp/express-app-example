import { SessionData } from "express-session";

export type ISession = {
    sessionId: string;
    sessionData: SessionData;
    expires: Date
}