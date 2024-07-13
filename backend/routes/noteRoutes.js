const express = require("express")
const { createNote, getAllNotes, getNoteById } = require("../controllers/note")
const { ensureAuthenticated } = require("../utils/auth")

const router = express.Router()

router.post("/note", ensureAuthenticated, createNote)
router.get("/notes", getAllNotes)
router.get("/note/:id", getNoteById)

module.exports = router