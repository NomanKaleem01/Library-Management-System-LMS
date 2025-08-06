const Book = require("../models/bookmodel");
const IssuedBook = require("../models/issuebookmodel");

async function addBook(data) {
  return await Book.create(data);
}

async function getAllBooks() {
  return await Book.find();
}

async function issueBook(userId, bookId) {
  return await IssuedBook.create({ userId, bookId });
}

async function getIssuedBooks(userId) {
  return await IssuedBook.find({ userId }).populate("bookId");
}

async function returnBook(userId, bookId) {
  return await IssuedBook.findOneAndDelete({ userId, bookId });
}

module.exports = { addBook, getAllBooks, issueBook, getIssuedBooks, returnBook };

