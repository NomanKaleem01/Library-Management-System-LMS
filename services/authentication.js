const jwt = require("jsonwebtoken");
const repo = require("../repository/authentication");


async function signupUser(req) {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) throw new Error("All fields are required");

  const existingUser = await repo.findByEmail(email);
  if (existingUser) throw new Error("User already exists");

  const newUser = await repo.createUser({ name, email, password, role: role || "user" });

  const token = jwt.sign(
    { id: newUser._id, email: newUser.email, role: newUser.role }, 
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { newUser, token };
}


async function loginUser(req) {
  const { email, password } = req.body;
  if (!email || !password) throw new Error("All fields are required");

  const user = await repo.findByEmail(email);
  if (!user) throw new Error("Invalid email or password");

  if (!user.validatePassword(password))
    throw new Error("Invalid email or password");

  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { user, token }; 
}

async function registerAdminService(req) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) throw new Error("All fields are required");

  const existingUser = await repo.findByEmail(email);
  if (existingUser) throw new Error("Admin already exists");

  const newAdmin = await repo.createUser({ name, email, password, role: "admin" });

  const token = jwt.sign(
    { id: newAdmin._id, email: newAdmin.email, role: newAdmin.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { newAdmin, token };
}

module.exports = { signupUser, loginUser, registerAdminService };
