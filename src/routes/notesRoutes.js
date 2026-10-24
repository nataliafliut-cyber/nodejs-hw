import { Router } from 'express';
import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';
import {
  getAllNotesSchema,
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';
import { celebrate, Segments } from 'celebrate';

const router = Router();

router.get('/notes', celebrate({ [Segments.QUERY]: getAllNotesSchema }), getAllNotes);

router.get('/notes/:noteId', celebrate({ [Segments.PARAMS]: noteIdSchema }), getNoteById);

router.post('/notes', celebrate({ [Segments.BODY]: createNoteSchema }), createNote);

router.delete('/notes/:noteId', celebrate({ [Segments.PARAMS]: noteIdSchema }), deleteNote);

router.patch(
  '/notes/:noteId',
  celebrate({
    [Segments.PARAMS]: noteIdSchema,
    [Segments.BODY]: updateNoteSchema,
  }),
  updateNote,
);

export default router;