const Author = require("../models/authorModel");

const allAuthors = async (req, res) => {
  const authors = await Author.find().populate('books',{name:1}).select({ name: 1, description: 1 });
  res.json(authors);
};
const getAuthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).send({
        message: "author not found",
      });
    }
    res.json(author);
  } catch (err) {
    res.status(500).json({ message: "author not found" });
  }
};
const createAuthor = async (req, res) => {
  const { name, description } = req.body;
  if (!name | !description) {
    return res.status(403).send({ message: "all fields are required" });
  }
  try {
    const author = await Author.create({
      name,
      description,
    });
    res.status(201).json({
      message: "author created succesfully",
      author,
    });
  } catch (err) {
    res.status(500).json({
      message: "error creating author",
    });
  }
};
const updateAuthor = async (req, res) => {
  const { name, description } = req.body;
  try {
    const author = await Author.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
      },
      { new: true }
    );
    if (!author) {
      return res.status(404).send({
        message: "author not found",
      });
    }
    res.status(200).json({
      message: "author updated succesfully",
      author,
    });
  } catch (err) {
    res.status(500).json({
      message: "error updating author",
    });
  }
};
const deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) {
      return res.status(404).send({
        message: "author not found",
      });
    }
    res.status(200).json({
      message: "author deleted succesfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "error deleted author",
    });
  }
};

module.exports = {
  allAuthors,
  getAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
