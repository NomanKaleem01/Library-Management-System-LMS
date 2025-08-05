const repo = require("../repository/bookrepository");

async function addBook(data) {
  return await repo.addBook(data); // req.body ki jagah sirf data
}

async function getBooks() {
  return await repo.getAllBooks();
}

async function issueBook({ userId, bookId }) {
  if (!userId || !bookId) throw new Error("userId and bookId are required");
  return await repo.issueBook(userId, bookId);
}

async function getMyIssuedBooks(userId) {
  return await
   repo.getIssuedBooks(userId);
}

async function returnBook(req) {
  const { bookId } = req.body;
  if (!bookId) throw new Error("bookId is required");

  return await repo.returnBook(req.user.id, bookId);
}

module.exports = { addBook, getBooks, issueBook, getMyIssuedBooks, returnBook };
