import { MongoClient } from 'mongodb'

// Ensure MongoDB URI exists
if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI environment variable is not defined');
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

const uri = process.env.MONGODB_URI
console.log('MongoDB URI is defined, length:', uri.length);

const options = {
  // Add more reliability options
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 10000,
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    console.log('Creating new MongoDB client in development');
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
      .catch(err => {
        console.error('MongoDB connection error in development:', err);
        throw err;
      });
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  console.log('Creating new MongoDB client in production');
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
    .catch(err => {
      console.error('MongoDB connection error in production:', err);
      throw err;
    });
}

// Add a then handler to log successful connection
clientPromise
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection promise rejected:', err));

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise 