// src/database/database.ts
import mongoose from 'mongoose';
import configs from '../config';

async function connectMongoDB() {
  try {
    await mongoose.connect(configs.mongodbUrl);
    console.log('Connected to MongoDB successfully!');
  } catch (error: any) {
    console.error('Error connecting to MongoDB:', error.message);
  }
}

export { connectMongoDB };
