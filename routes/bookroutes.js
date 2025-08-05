const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authentication");
const verifyAdmin = require("../middleware/adminmiddleware");
const { addBook, getBooks, issueBook, getMyIssuedBooks,returnBook } = require("../controllers/bookcontroller");


// ✅ Admin Routes
router.post("/add", verifyToken, addBook);
router.post("/issue", verifyToken, issueBook); // ✅ Only Admin can issue book

// ✅ User Routes
router.get("/all", verifyToken, getBooks);
router.get("/mybooks", verifyToken, getMyIssuedBooks);
router.post("/return", verifyToken, returnBook);

module.exports = router;
