const Note = require("../models/note.modal");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.createNote = async (req, res, next) => {
  const { title, content, tags } = req.body;
  const { user } = req.user;
  if (!title) {
    return res.status(400).json({ error: true, message: "Title is required" });
  }
  if (!content) {
    return res
      .status(400)
      .json({ error: true, message: "Content is required" });
  }

  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });
    await note.save();
    return res.json({
      error: false,
      note,
      message: "Note created successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Server error" });
  }
};
module.exports.EditNote = async (req, res, next) => {
  const { title, content, tags, ispinned } = req.body;
  const { id } = req.params;
  const { user } = req.user;
  if (!title || !content || !tags) {
    return res.status(400).json({ error: true, message: "No vhange provided" });
  }
  try {
    const note = await Note.findOne({ _id: id, userId: user._id });
    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }
    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (ispinned) note.ispinned = ispinned;

    await note.save();
    return res.json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Server error" });
  }
};

module.exports.GetAllNOte = async (req, res, next) => {
  const { user } = req.user;
  try {
    const notes = await Note.find({ userId: user._id }).sort({ ispinned: -1 });
    return res.json({
      error: false,
      notes,
      message: "All notes fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Server error" });
  }
};
module.exports.DeleteNOte = async (req, res, next) => {
  const { id } = req.params;
  const { user } = req.user;
  try {
    const note = await Note.findOne({ _id: id, userId: user._id });
    if (!note)
      return res.status(404).json({ error: true, message: "Note not found" });

    await Note.deleteOne({ _id: id, userId: user._id });
    return res.json({ error: false, message: "Note deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Server error" });
  }
};
module.exports.Pinned = async (req, res, next) => {
  const { ispinned } = req.body;
  const { id } = req.params;
  const { user } = req.user;
  try {
    const note = await Note.findOne({ _id: id, userId: user._id });
    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }
    note.ispinned = ispinned || false;

    await note.save();
    return res.json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: true, message: "Server error" });
  }
};
