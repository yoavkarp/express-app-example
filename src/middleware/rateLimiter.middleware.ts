import rateLimit from 'express-rate-limit';

export const limiterMiddleware = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    legacyHeaders: false, // use X-Forwarded-For headers
    validate: {
        xForwardedForHeader: false
    }
});