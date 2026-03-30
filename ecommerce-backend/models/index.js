import mongoose from 'mongoose';

const DEFAULT_MONGODB_URI = 'mongodb://127.0.0.1:27017/ecommerce-backend';

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) {
    return;
  }

  const mongoUri = process.env.MONGODB_URI || DEFAULT_MONGODB_URI;
  const dbName = process.env.MONGODB_DB;

  await mongoose.connect(mongoUri, dbName ? { dbName } : undefined);
  isConnected = true;
}

export { mongoose };
