const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

module.exports = mongoose.model('Todo', TodoSchema);
