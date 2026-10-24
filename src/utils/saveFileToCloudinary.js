import cloudinary from 'cloudinary';
import { env } from './env.js';
import streamifier from 'node:streamifier';

cloudinary.v2.config({
  cloud_name: env('CLOUDINARY_CLOUD_NAME'),
  api_key: env('CLOUDINARY_API_KEY'),
  api_secret: env('CLOUDINARY_API_SECRET'),
});

export const saveFileToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      { folder: 'avatars' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};