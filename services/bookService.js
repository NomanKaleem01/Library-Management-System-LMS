const repo = require("../repository/bookrepository");

async function addBook(data) {
  return await repo.addBook(data); 
}

async function getBooks() {
  return await repo.getAllBooks();
}

async function issueBook({ userId, bookId }) {
  const book = await Book.findById(bookId);
    if (!book || book.availableCopies < 1) throw new Error("Book not available");
  
    book.availableCopies -= 1;
    await book.save();
  if (!userId || !bookId) throw new Error("userId and bookId are required");
  return await repo.issueBook(userId, bookId);
}
  
async function getMyIssuedBooks(userId) {
  return await repo.getIssuedBooks(userId);
}

async function returnBook(req) {
  if (!req.user || !req.body) throw new Error("Invalid request");
  const { bookId } = req.body;
  if (!bookId) throw new Error("bookId is required");

  const issued = await repo.returnBook(req.user.id, bookId);
  if (!issued) throw new Error("This book was not issued to you");
  // ✅ Update the book's available copies
  // Assuming Book model has a method to find by ID and update available copies
  const book = await Book.findById(bookId);
  if (book) {
    book.availableCopies += 1;
    await book.save();
  }
  return { message: "Book returned successfully" };
}

module.exports = { addBook, getBooks, issueBook, getMyIssuedBooks, returnBook };
