const Authentication = require("../models/authentication");
const jwt = require("jsonwebtoken");

const isSuperAdmin = async (req, res, next) => {
  try {
    const user = await Authentication.findById(req.user.id);

    if (!user || user.role !== "superadmin") {
      return res.status(403).json({ error: "Access denied. Super Admin only." });
    }

    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = isSuperAdmin;
