const jwt = require ("jsonwebtoken");

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];

  if (token && token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  } else {
    return res.status(401).json({ error: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ Only use env secret
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Invalid Token" });
  }
}

module.exports = verifyToken;
