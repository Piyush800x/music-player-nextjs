import type { NextApiRequest, NextApiResponse } from "next";
import { searchSongs } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

interface Data {
    message: string;
    results?: any[];
};

export async function POST(req: NextRequest, res: NextApiResponse) {
    const {query} = await req.json();
    console.log(`Query: ${JSON.stringify(query)}`)
    if (!query || typeof query !== 'string') {
        return res.status(400).json({ message: 'Invalid query parameter' });
    }

    try {
        const results = await searchSongs(query);
        return NextResponse.json({songs: results}, {status: 200})
    } catch (error) {
        return res.status(500).json({ message: 'Error searching for songs', error: error });
    }
}