const authschema = require("../models/authentication");

async function findByEmail(email) {
  return await authschema.findOne({ email });
}

async function createUser(data) {
  return await authschema.create(data);
}

module.exports = { findByEmail, createUser };
