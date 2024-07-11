import { NextRequest, NextResponse } from "next/server";
import mongoClientPromise from "@/lib/mongodb";
import { uploadToS3 } from "@/lib/aws";

const db = mongoClientPromise;

export async function POST(req: NextRequest) {

    const data = await JSON.parse(req.headers.get('Metadata') || '{}');;

    // Write to s3
    const key = `${data.artist}/${data.album}/${data.filename}`;
    console.log(`New Key: ${key}`);
    const chunks: Uint8Array[] = [];
    req.body?.pipeTo(new WritableStream({
        write(chunk) {
            chunks.push(chunk);
        },
        async close() {
            const fileContent = Buffer.concat(chunks);
            const response = await uploadToS3(key, fileContent);
            console.log(response);
        }
    }))

    // const fileContent = Buffer.concat(chunks);
    // const response = await uploadToS3(key, fileContent);
    // console.log(`response upload: ${response}`);
    
    console.log(data)
    return NextResponse.json({status: 200});
}
