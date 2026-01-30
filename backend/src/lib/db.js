import { MongoClient, ObjectId } from 'mongodb'

let client

export async function connectToDatabase(uri) {
  if (!uri) {
    throw new Error('MONGO_URI not provided')
  }
  client = new MongoClient(uri)
  await client.connect()
  console.log('Connected to MongoDB')
  return client.db()
}

export function getDb() {
  if (!client) throw new Error('Database not connected')
  return client.db()
}

export async function closeDb() {
  if (client) await client.close()
}

export { ObjectId }
