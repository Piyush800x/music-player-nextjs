import { NextRequest, NextResponse } from "next/server";
import mongoClientPromise from "@/lib/mongodb";
import { uploadToS3 } from "@/lib/aws";
import { getArtistsCollection, getAlbumsCollection, getSongsCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";


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
    const song_data = {
        songName: data.musicName,
        artistName: data.artist,
        albumName: data.album,
        songFileName: key
    }
    const song_id = await insertSong(song_data);
    console.log(`song_id: ${song_id}`);

    console.log(data)
    return NextResponse.json({status: 200});
}

interface SongData {
    songName: string, 
    artistName: string,
    albumName: string,
    songFileName: string
}

async function insertSong({songName, artistName, albumName, songFileName}: SongData) {
    const client = await mongoClientPromise;
    const db = client.db(`${process.env.MONGODB_DB}`);

    const artistsCollection = getArtistsCollection(db);
    const albumsCollection = getAlbumsCollection(db);
    const songsCollection = getSongsCollection(db);

    // Ensure if artist exists
    let artist = await artistsCollection.findOne({name: artistName});
    if (!artist) {
        const artistResult = await artistsCollection.insertOne({
            _id: new ObjectId,
            name: artistName, 
            albums: []
        });
        artist = {_id: artistResult.insertedId, name: artistName, albums: []};
    }

    // Ensure the album exists and is linked to the artist
    let album = await albumsCollection.findOne({name: albumName, artist_id: artist._id});
    if (!album) {
        const albumResult = await albumsCollection.insertOne({
            _id: new ObjectId,
            name: albumName, 
            artist_id: artist._id, 
            songs: []
        });
        album = { _id: albumResult.insertedId, name: albumName, artist_id: artist._id, songs: [] };

        await artistsCollection.updateOne(
            {_id: artist._id},
            { $push: { albums: { album_id: album._id, name: albumName } } }
        );
    }

    // inserting the song into songs collection
    const songResult = await songsCollection.insertOne({
        _id: new ObjectId,
        name: songName,
        album_id: album._id,
        artist_id: artist._id,
        song_file_name: songFileName
    });
    const song = {_id: songResult.insertedId, song_name: songFileName, song_file_name: songFileName}

    // Update the album to refer the new song
    await albumsCollection.updateOne(
        {_id: album._id},
        { $push: { songs: { song_id: song._id, name: songName , song_file_name: songFileName}}}
    );

    return song._id
}