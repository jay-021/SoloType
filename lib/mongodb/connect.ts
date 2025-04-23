import { MongoClient, MongoClientOptions, Db } from 'mongodb';

// Connection URI from environment variable
const uri = process.env.MONGODB_URI as string;

// Connection options
const options: MongoClientOptions = {
  maxPoolSize: 10,
};

// Cache for existing client
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

/**
 * Connect to MongoDB with caching for connection reuse
 */
export async function connectToDatabase() {
  // Return cached connection if it exists
  if (cachedClient && cachedDb) {
    console.log('[MongoDB] Using cached connection');
    return { client: cachedClient, db: cachedDb };
  }

  console.log('[MongoDB] Creating new connection');

  // Create a new client
  const client = new MongoClient(uri, options);

  try {
    // Connect the client
    await client.connect();

    // Get the database
    const db = client.db('solotype');

    // Cache the connection
    cachedClient = client;
    cachedDb = db;

    console.log('[MongoDB] Connected successfully');

    return { client, db };
  } catch (error) {
    console.error('[MongoDB] Connection error:', error);
    throw error;
  }
}
