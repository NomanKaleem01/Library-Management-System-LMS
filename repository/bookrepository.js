const Book = require("../models/bookmodel");
const IssuedBook = require("../models/issuebookmodel");

async function addBook(data) {
  return await Book.create(data);
}

async function getAllBooks() {
  return await Book.find();
}

async function issueBook(userId, bookId) {
  const book = await Book.findById(bookId);
  if (!book || book.availableCopies < 1) throw new Error("Book not available");

  book.availableCopies -= 1;
  await book.save();

  return await IssuedBook.create({ userId, bookId });
}

async function getIssuedBooks(userId) {
  return await IssuedBook.find({ userId }).populate("bookId");
}
async function returnBook(userId, bookId) {
  const issued = await IssuedBook.findOneAndDelete({ userId, bookId });
  if (!issued) throw new Error("This book was not issued to you");

  const book = await Book.findById(bookId);
  if (book) {
    book.availableCopies += 1;
    await book.save();
  }

  return { message: "Book returned successfully" };
}

module.exports = { addBook, getAllBooks, issueBook, getIssuedBooks, returnBook };

