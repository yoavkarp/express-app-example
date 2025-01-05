declare namespace NodeJS {
    interface ProcessEnv extends Readonly<{
        NODE_ENV?: 'development' | 'production' | 'test';
        PORT?: string;
        MONGODB_URI?: string;
        SESSION_SECRET?: string;
    }> { }
}