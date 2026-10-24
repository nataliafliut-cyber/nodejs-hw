import mongoose from 'mongoose';
import { env } from '../utils/env.js';

export const connectMongoDB = async () => {
  try {
    const connectionString = env('MONGO_URL');
    await mongoose.connect(connectionString);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log('Error connecting to MongoDB', error);
    throw error;
  }
};