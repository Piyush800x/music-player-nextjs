import { MongoClient, ObjectId, Collection, Document, Db } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let mongoClientPromise: Promise<MongoClient>;


// In production mode, create a new client for each request
client = new MongoClient(uri, options);
mongoClientPromise = client.connect();


export default mongoClientPromise;

export interface Artist {
  _id: ObjectId,
  name: string,
  albums: Array<{album_id: ObjectId; name: string}>
}

export interface Album {
  _id: ObjectId;
  name: string;
  artist_id: ObjectId;
  songs: Array<{ song_id: ObjectId; name: string, song_file_name: string }>;
}

export interface Song {
  _id: ObjectId;
  name: string;
  album_id: ObjectId;
  artist_id: ObjectId;
  song_file_name: string;
}

export const getArtistsCollection = (db: Db): Collection<Artist> => db.collection('artists');
export const getAlbumsCollection = (db: Db): Collection<Album> => db.collection('albums');
export const getSongsCollection = (db: Db): Collection<Song> => db.collection('songs');
