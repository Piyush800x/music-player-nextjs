import { NextRequest, NextResponse } from "next/server";
import mongoClientPromise from "@/lib/mongodb";
import { uploadToS3 } from "@/lib/aws";


export async function POST(req: NextRequest) {

    const data = await JSON.parse(req.headers.get('Metadata') || '{}');;

    // Write to s3
    const key = `${data.artist}/${data.album}/${data.filename}`;
    console.log(`New Key: ${key}`);
    // working
    const chunks: Uint8Array[] = [];
    await req.body?.pipeTo(new WritableStream({
        write(chunk) {
            chunks.push(chunk);
        },
        async close() {
            const fileContent = Buffer.concat(chunks);
            const response = await uploadToS3(key, fileContent);
            console.log(response);
        }
    }))
    const song_id = await insertSong(data.musicName, data.artist, data.album, key);
    console.log(`song_id: ${song_id}`);

    console.log(data)
    return NextResponse.json({status: 200});
}

const insertSong = async (songName: string, artistName: string, albumName: string, songFileName: string) => {
    const client = await mongoClientPromise;
    const db = client.db(`${process.env.MONGODB_DB}`);

    // Ensure if artist exists
    let artist = await db.collection('artists').findOne({name: artistName});
    if (!artist) {
        const artistResult = await db.collection('artists').insertOne({name: artistName, albums: []});
        artist = {_id: artistResult.insertedId, name: artistName, albums: []};
    }

    // Ensure the album exists and is linked to the artist
    let album = await db.collection('albums').findOne({name: albumName, artist_id: artist._id});
    if (!album) {
        const albumResult = await db.collection('albums').insertOne({ name: albumName, artist_id: artist._id, songs: [] });
        album = { _id: albumResult.insertedId, name: albumName, artist_id: artist._id, songs: [] };

        await db.collection('artists').updateOne(
            {_id: artist._id},
            { $push: { albums: { album_id: album._id, name: albumName } } }
        );
    }

    // inserting the song into songs collection
    const songResult = await db.collection('songs').insertOne({
        song_name: songName,
        album_id: album._id,
        artist_id: artist._id,
        song_file_name: songFileName
    });
    const song = {_id: songResult.insertedId, song_name: songFileName, song_file_name: songFileName}

    // Update the album to refer the new song
    await db.collection('albums').updateOne(
        {_id: album._id},
        { $push: { songs: { sond_id: song._id, song_file_name: songFileName}}}
    );

    return song._id
}