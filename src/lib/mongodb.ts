import { MongoClient, MongoClientOptions } from 'mongodb';

if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in environment variables');
  throw new Error('Please add your Mongo URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options: MongoClientOptions = {};

let _mongoClientPromise: Promise<MongoClient> | undefined;
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  console.log('🛠️ MongoDB: Development mode - using global cache');

  if (!_mongoClientPromise) {
    client = new MongoClient(uri, options);
    _mongoClientPromise = client.connect().then((connectedClient) => {
      console.log('✅ Connected to MongoDB (dev)');
      return connectedClient;
    }).catch((err) => {
      console.error('❌ Failed to connect to MongoDB (dev):', err);
      throw err;
    });
  }

  clientPromise = _mongoClientPromise!;
} else {
  console.log('🚀 MongoDB: Production mode - creating new connection');

  client = new MongoClient(uri, options);
  clientPromise = client.connect().then((connectedClient) => {
    console.log('✅ Connected to MongoDB (prod)');
    return connectedClient;
  }).catch((err) => {
    console.error('❌ Failed to connect to MongoDB (prod):', err);
    throw err;
  });
}

export default clientPromise;
