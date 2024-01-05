import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

const cashed = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cashed.conn) return cashed.conn;

  if (!MONGODB_URI) throw new Error('MongoDb URI is missing');

  cashed.promise =
    cashed.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: 'evently',
      bufferCommands: false,
    });

  cashed.conn = await cashed.promise;

  return cashed.conn;
};
