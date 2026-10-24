import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './utils/env.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { errors } from 'celebrate';
import { logger } from './middleware/logger.js';

const PORT = Number(env('PORT', 3000));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  app.use(logger);

  // Підключаємо роути
  app.use(authRoutes);
  app.use(notesRoutes);

  app.use(notFoundHandler);
  app.use(errors());
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

const startServer = async () => {
  try {
    await connectMongoDB();
    setupServer();
  } catch (error) {
    console.error('Failed to start the application:', error);
    process.exit(1);
  }
};

startServer();