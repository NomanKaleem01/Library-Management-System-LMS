const service = require("../services/bookService");

const addBook = async (req, res) => {
  try {
    const book = await service.addBook(req.body); // ✅ sirf body pass karo
    res.status(201).json({ message: "Book added successfully", book });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await service.getBooks();
    res.json(books);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const issueBook = async (req, res) => {
  try {
    const issued = await service.issueBook(req.body); // ✅ sirf body pass karo
    res.json({ message: "Book issued successfully", issued });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getMyIssuedBooks = async (req, res) => {
  try {
    const books = await service.getMyIssuedBooks(req.user.id);
    res.json(books);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const returnBook = async (req, res) => {
  try {
    const result = await service.returnBook(req);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { addBook, getBooks, issueBook, getMyIssuedBooks, returnBook };
