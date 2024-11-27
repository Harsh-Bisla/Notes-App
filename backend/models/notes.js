const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    isPinned: {
        type: Boolean,
        default:false
    },
    tags: [],
    userId: {
        type: String
    }
});

const Notesmodel = mongoose.model("note", notesSchema);
module.exports = Notesmodel;