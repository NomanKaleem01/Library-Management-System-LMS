const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authentication");
const verifyAdmin = require("../middleware/adminmiddleware");
const controller = require("../controllers/bookrequestcontroller");


router.post("/request", verifyToken, controller.requestBook);
router.put("/cancel/:id", verifyToken, controller.cancelRequest);

router.get("/requests", verifyToken, verifyAdmin, controller.getRequests);
router.put("/approve/:id", verifyToken, verifyAdmin, controller.approveRequest);
router.put("/reject/:id", verifyToken, verifyAdmin, controller.rejectRequest);

module.exports = router;
