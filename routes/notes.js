const express = require('express');
const router = express.Router();
const Note = require('../models/note');

// Get all notes
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find();
        res.render('notes/index', { notes });
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});

// Add a new note
router.post('/add', async (req, res) => {
    try {
        const note = new Note({ text: req.body.note });
        await note.save();
        res.redirect('/notes');
    } catch (err) {
        console.error(err);
        res.redirect('/notes');
    }
});

module.exports = router;
