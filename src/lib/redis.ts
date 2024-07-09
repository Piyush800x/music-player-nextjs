import { createClient } from 'redis';

export const client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_URL,
        port: 12244
    }
});