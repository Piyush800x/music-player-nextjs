// lib/mongodb.ts
import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;


// In production mode, create a new client for each request
client = new MongoClient(uri, options);
clientPromise = client.connect();


export default clientPromise;
