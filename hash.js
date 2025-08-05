const crypto = require("crypto");
const password = "supersecure123";

const salt = crypto.randomBytes(16).toString("hex");

const hashedPassword = crypto
  .createHmac("sha256", salt)
  .update(password)
  .digest("hex");

console.log({ salt, hashedPassword });
