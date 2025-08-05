const mongoose = require("mongoose");

const issuedBookSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Authentication", required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  issueDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("IssuedBook", issuedBookSchema);
