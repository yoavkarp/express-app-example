import { config } from 'dotenv';

const envMap: Record<Exclude<typeof process.env.NODE_ENV, undefined>, string> = {
    'development': '.env.dev',
    'production': '.env.prod',
    'test': '.env.test'
}

const cfg = config({ path: envMap[process.env.NODE_ENV || 'development'] });

export { }