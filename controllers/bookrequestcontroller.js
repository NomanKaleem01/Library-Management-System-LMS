const service = require("../services/bookrequestservice");

const requestBook = async (req, res) => {
  try {
    const request = await service.requestBook(req);
    res.status(201).json({ message: "Book request created", request });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getRequests = async (req, res) => {
  try {
    const requests = await service.getRequests();
    res.json(requests);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const approveRequest = async (req, res) => {
  try {
    const request = await service.approveRequest(req.params.id);
    res.json({ message: "Request approved", request });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const rejectRequest = async (req, res) => {
  try {
    const request = await service.rejectRequest(req.params.id);
    res.json({ message: "Request rejected", request });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const cancelRequest = async (req, res) => {
  try {
    const request = await service.cancelRequest(req.params.id, req.user.id);
    res.json({ message: "Request cancelled", request });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { requestBook, getRequests, approveRequest, rejectRequest, cancelRequest };
