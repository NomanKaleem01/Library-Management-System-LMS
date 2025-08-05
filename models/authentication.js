  const mongoose = require ('mongoose');
  const crypto = require("crypto");
  const authschema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    salt: { type: String },
    password: { type: String, required: true },
    role: { type: String, enum: ["superadmin", "admin", "user"], default: "user" }
  });

  authschema.pre("save", function (next) {
    if (!this.isModified("password")) return next();

    this.salt = crypto.randomBytes(16).toString("hex");

    // hash password using HMAC-SHA256
    this.password = crypto
      .createHmac("sha256", this.salt)
      .update(this.password)
      .digest("hex");

    next();
  });

  authschema.methods.validatePassword = function (enteredPassword) {
    const hash = crypto
      .createHmac("sha256", this.salt)
      .update(enteredPassword)
      .digest("hex");

    return this.password === hash;
  };


  module.exports = mongoose.model('Authentication',authschema);