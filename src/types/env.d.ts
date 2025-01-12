declare namespace NodeJS {
    interface ProcessEnv extends Readonly<{
        NODE_ENV?: 'development' | 'production' | 'test';
        PORT?: string;
        MONGODB_URI?: string;
        readonly REFRESH_TOKEN_PUBLIC_KEY?: string;
        readonly REFRESH_TOKEN_PRIVATE_KEY?: string;
        readonly ACCESS_TOKEN_PUBLIC_KEY?: string;
        readonly ACCESS_TOKEN_PRIVATE_KEY?: string;
    }> { }
}