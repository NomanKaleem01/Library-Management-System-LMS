
const repo = require("../repository/bookrequestrepository");
const bookRepo = require("../repository/bookrepository");

async function requestBook(req) {
  const { bookId } = req.body;
  return await repo.createRequest(req.user.id, bookId);
}

async function getRequests() {
  return await repo.getPendingRequests();
}

async function approveRequest(requestId) {
  const request = await repo.updateRequestStatus(requestId, "approved");
  if (!request) throw new Error("Request not found");

  // ✅ Book issue karna
  await bookRepo.issueBook(request.userId, request.bookId);
  return request;
}

async function rejectRequest(requestId) {
  return await repo.updateRequestStatus(requestId, "rejected");
}



async function cancelRequest(requestId, userId) {
    
  return await repo.updateRequestStatus(requestId, "cancelled");
}


module.exports = { requestBook, getRequests, approveRequest, rejectRequest,cancelRequest };
