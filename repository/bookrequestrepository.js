const BookRequest = require("../models/bookrequest");

async function createRequest(userId, bookId) {
  return await BookRequest.create({ userId, bookId });
}

async function getPendingRequests() {
  return await BookRequest.find({ status: "pending" }).populate("userId bookId");
}

async function updateRequestStatus(requestId, status) {
  return await BookRequest.findByIdAndUpdate(requestId, { status }, { new: true });
}

module.exports = { createRequest, getPendingRequests, updateRequestStatus };
