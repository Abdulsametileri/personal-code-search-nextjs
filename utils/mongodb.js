import { MongoClient } from 'mongodb'

const { PCS_MONGODB_URI, MONGODB_DATABASE } = process.env

if (!PCS_MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

if (!MONGODB_DATABASE) {
  throw new Error(
    'Please define the MONGODB_DATABASE environment variable inside .env.local'
  )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo

if (!cached) {
  cached = global.mongo = { conn: null, promise: null }
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }

    cached.promise = MongoClient.connect(PCS_MONGODB_URI, opts).then((client) => {
      return {
        client,
        db: client.db(MONGODB_DATABASE),
      }
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}