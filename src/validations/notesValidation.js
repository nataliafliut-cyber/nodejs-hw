import Joi from 'joi';
import { isValidObjectId } from 'mongoose';
import { TAGS } from '../constants/tags.js';

export const noteIdSchema = Joi.object({
  noteId: Joi.string().custom((value, helpers) => {
    if (!isValidObjectId(value)) {
      return helpers.error('any.invalid');
    }
    return value;
  }, 'ObjectId validation').required(),
});

export const getAllNotesSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  perPage: Joi.number().integer().min(5).max(20).default(10),
  tag: Joi.string().valid(...TAGS),
  search: Joi.string().allow('').optional(),
});

export const createNoteSchema = Joi.object({
  title: Joi.string().min(1).required(),
  content: Joi.string().allow('').optional(),
  tag: Joi.string().valid(...TAGS).optional(),
});

export const updateNoteSchema = Joi.object({
  title: Joi.string().min(1),
  content: Joi.string().allow(''),
  tag: Joi.string().valid(...TAGS),
}).min(1);