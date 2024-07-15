import type { NextApiRequest, NextApiResponse } from "next";
import { searchSongs } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import getRedisClient from '@/lib/redis';

interface Data {
    message: string;
    results?: any[];
};

export async function POST(req: NextRequest, res: NextApiResponse) {
    const {query} = await req.json();
    console.log(`Query: ${JSON.stringify(query)}`)

    // Search in Redis first
    const redisClient = await getRedisClient();
    const cacheKey = `search:${query}`
    const cachedResult = await redisClient.get(cacheKey);

    if (cachedResult) {
        console.log(`Cached: ${JSON.stringify(cachedResult)}`)
        return NextResponse.json({songs: JSON.parse(cachedResult)}, {status: 200})
    }

    // If not in cache, query db
    if (!query || typeof query !== 'string') {
        return res.status(400).json({ message: 'Invalid query parameter' });
    }

    try {
        const results = await searchSongs(query);
        await redisClient.set(cacheKey, JSON.stringify(results), {"EX": 60*60})
        return NextResponse.json({songs: results}, {status: 200})
    } catch (error) {
        return res.status(500).json({ message: 'Error searching for songs', error: error });
    }
}