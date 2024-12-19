import { SessionData } from "express-session";

export type Session = {
    sessionId: string;
    sessionData: SessionData;
    expires: Date
}