import helmet from "helmet";

export const helmetMiddleware = helmet({
    xPoweredBy: false,
    noSniff: false,
    frameguard: { action: 'deny' },
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: [],
        },
    },
    hsts: {
        maxAge: 31536000, // 1 year
        includeSubDomains: true, // Apply to subdomains
        preload: true,
    },
    referrerPolicy: { policy: 'no-referrer' },
    permittedCrossDomainPolicies: { permittedPolicies: 'none' }
})