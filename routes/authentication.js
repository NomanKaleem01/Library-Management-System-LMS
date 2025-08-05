const express = require("express");
const router = express.Router();

const { signup, login, registerAdmin } = require("../controllers/authentication");
const verifyToken = require("../middleware/authentication");
const isSuperAdmin = require("../middleware/issuperadmin");

router.post("/signup", signup);
router.post("/login", login);


router.post("/register-admin", verifyToken, isSuperAdmin, registerAdmin);

router.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "Welcome!", user: req.user });
});

module.exports = router;
