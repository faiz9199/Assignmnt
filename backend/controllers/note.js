const Note = require("../models/note");
const User = require("../models/user");

const createNote = async (req, res) => {
  const authorId = req.user.id;
  const { title, content, mediaLink } = req.body;
  try {
    // Step 1: Create a new note
    const note = new Note({
      title,
      content,
      mediaLink,
      authorId,
    });

    // Step 2: Save the note
    await note.save();

    // Step 3: Add the note ID to the user's Posts array
    const user = await User.findById(authorId);
    if (user) {
      user.Posts.push(note._id);
      await user.save();
    }

    // Step 4: Populate the author's full name and respond with the note and author's full name
    const populatedNote = await Note.findById(note._id).populate('authorId', 'fullName');
    res.status(201).json({ msg: "Note created", note: populatedNote });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({}).populate('authorId', 'fullName');
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id).populate('authorId', 'fullName');

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createNote, getAllNotes, getNoteById };
