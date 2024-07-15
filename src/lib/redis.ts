import { createClient, RedisClientType } from 'redis';

let client: RedisClientType | null = null;

const getRedisClient = async (): Promise<RedisClientType> => {
    if (!client) {
        client = createClient({
            password: process.env.REDIS_PASSWORD,
            socket: {
                host: process.env.REDIS_URL,
                port: 12244
        }});
        await client.connect();

        client.on('error', (err) => {
            console.error(`Redis error: ${err}`)
        })

        client.on('end', () => {
            console.log('Redis client closed');
            client = null; // Reset the client to null on end
        });
    }
    return client;
}


export default getRedisClient;