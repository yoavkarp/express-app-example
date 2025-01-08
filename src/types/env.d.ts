declare namespace NodeJS {
    interface ProcessEnv extends Readonly<{
        NODE_ENV?: 'development' | 'production' | 'test';
        PORT?: string;
        MONGODB_URI?: string;
        SESSION_SECRET?: string;
        JWKS_URI: string;
        AWS_COGNITO_USER_POOL_ID: string;
        AWS_COGNITO_CLIENT_ID: string;
        AWS_REGION: string;
    }> { }
}