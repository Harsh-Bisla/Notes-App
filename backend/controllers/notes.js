const Notesmodel = require("../models/notes");
const UserModel = require("../models/user");

// creating note
const handleCreateNote = async (req, res) => {
    const user = await UserModel.findOne({ _id: req.user.id });
    const { title, content, tag } = req.body;
    if (title && content) {
        try {
            await Notesmodel.create({
                title,
                content,
                userId: user._id,
                tags: tag
            });
            return res.send({ msg: "Note added succssfully", success: true });
        } catch (error) {
            return res.send({ msg: "Internal server error", success: false });
        }
    }
    else {
        return res.send({ msg: "please fill title, tag and content", success: false });
    }
}

// deleting note
const handleDeleteNote = async (req, res) => {
    const id = req.params.id;
    if (!id) return res.send({ msg: "something went wrong", success: false })
    try {
        await Notesmodel.findOneAndDelete({ _id: id });
        return res.send({ msg: "note deleted successfully", success: true });
    } catch (error) {
        return res.send({ msg: "Internal server error", success: false });
    }
}

// update note
const handleUpdateNote = async (req, res) => {
    const { title, content, tag } = req.body;
    const id = req.params.id;
    if (!id) return res.send({ msg: "something went wrong", success: false });
    if (title && content && tag) {
        try {
            await Notesmodel.findOneAndUpdate({ _id: id }, {
                $set: { title, content }, // Update title and content
                $addToSet: { tags: { $each: tag } } // Add new elements to `tags`
            });
            return res.send({ msg: "note updated successfully", success: true });
        } catch (error) {
            return res.send({ msg: "Internal server error", succes: false });
        }
    }
    else {
        return res.send({ msg: "title or content is empty", success: false });
    }

}

// get all notes
const handlegetNotes = async (req, res) => {
    try {
        const user = await UserModel.findOne({ _id: req.user.id });
        const notes = await Notesmodel.find({ userId: req.user.id });
        return res.send({ notes, success: true, user});
    } catch (error) {
        return res.send({ msg: "internal server error", success: false });
    }
}


// delete tag
const handleDeleteTag = async (req, res) => {
    const tagName = req.params.tagName;
    const { id } = req.body;
    if (tagName && id) {
        await Notesmodel.findOneAndUpdate({ _id: id }, { $pull: { tags: tagName } })
        return res.send({ msg: "tag removed successfully", success: true, tagName: tagName })
    }

    else {
        return res.send({ msg: "enter tag name first", success: false })
    }
}

// update pinned
const handlePinned = async (req, res) => {
    const id = req.params.id;
    const { isPinned } = req.body;
    if (id) {
        const note = await Notesmodel.findOne({ _id: id });
        if (!note) return res.send({ msg: "No note is found", success: false });
        note.isPinned = isPinned;
        await note.save();
        return res.send({ msg: "pinned updated" })
    }
    else {
        return res.send({ msg: "is pinned is empty", success: false })
    }
}

module.exports = {
    handleCreateNote,
    handleDeleteNote,
    handleUpdateNote,
    handlegetNotes,
    handleDeleteTag,
    handlePinned
}