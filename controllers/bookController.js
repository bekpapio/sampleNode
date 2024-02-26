const Author = require("../models/authorModel");
const Book = require("../models/bookModel");


const allBooks = async (req, res) => {
  try {
    // const books = await Book.find({ tags: req.query.tag });
    const books = await Book.find().populate({
      path: 'author',
      select: 'name description'
      // match: { status: 'new' }

    });
    res.send(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get single book
const getBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return res.status(404).send({
      message: "Book not found",
    });
  }
  res.send(book);
};

// create single book
const createBook = async (req, res) => {
  const { name, description,authorId,tags} = req.body;
  if (!name | !description|authorId|tags) {
    return res.status(403).send({ message: "all fields are required" });
  }
  const author=Author.findById(authorId);
  if(!author){
    return res.status(404).send({ message: "author not found" });
  }
  const book = await Book.create({
    name,
    description,
    tags,
    author:authorId
  });
  // update user books
  const updatedAuthor = await Author.findByIdAndUpdate(
    authorId,
    { $push: { books: book._id } },
    { new: true }
  );
  res.send(book);
};

// update single book
const updateBook = async (req, res) => {
  const { name, description } = req.body;
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
    },
    {
      new: true,
    }
  );
  if (!book) {
    return res.status(404).send({ message: "book not found" });
  }
  res.send(book);
};

// delete single book
const deleteBook = async (req, res) => {
  // const {name,description}=req.body;
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) {
    return res.status(404).send({ message: "book not found" });
  }

  // remove book from author table 
  const updatedAuthor = await Author.findByIdAndUpdate(
    book.author,
    { $pull: { books: book._id } },
    { new: true }
  );

  res.send({
    message:"book deleted sucessfully"
  });
};

module.exports = { allBooks, createBook, getBook, updateBook, deleteBook };
