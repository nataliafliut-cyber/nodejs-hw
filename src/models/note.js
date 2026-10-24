import { Schema, model } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const notesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, 
    },
    content: {
      type: String,
      required: true,
      trim: true, 
    },
    tag: {
      type: String,
      enum: TAGS,
      default: TAGS[0],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

notesSchema.index({ tag: 1 });

export const Note = model('note', notesSchema);