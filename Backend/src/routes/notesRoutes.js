import express from 'express';
import { getAllNotes, createNote, updateNote, deleteNote, getNoteById } from '../controllers/notescontroller.js';    


const router = express.Router();


router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);
// each of these routes corresponds to the functions defined in notescontroller.js
export default router;