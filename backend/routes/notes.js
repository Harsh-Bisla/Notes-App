const express = require('express');
const { handleCreateNote, handleDeleteNote, handleUpdateNote, handlegetNotes, handleAddTag, handleDeleteTag, handlePinned } = require('../controllers/notes');
const authenticate = require('../middlewares/authenticateUser');
const notesRouter = express.Router();

// create note route
notesRouter.post("/createnote", authenticate, handleCreateNote);
//delete note route
notesRouter.post("/deletenote/:id", authenticate, handleDeleteNote);
// update note route
notesRouter.post("/updatenote/:id", authenticate, handleUpdateNote);
// get notes route
notesRouter.get("/notes", authenticate, handlegetNotes);
// deletetag route
notesRouter.post("/deletetag/:tagName",authenticate,  handleDeleteTag);
// updatePinned route
notesRouter.post("/updatePinned/:id", authenticate, handlePinned )

module.exports = notesRouter;