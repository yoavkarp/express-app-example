import cors from 'cors';

export const corsMiddleware = cors({
    origin: 'http://localhost:*',
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true,
});