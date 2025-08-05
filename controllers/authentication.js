const { signupUser, loginUser } = require("../services/authentication");
const crypto = require("crypto");
const Authentication = require("../models/authentication");


const signup = async (req, res) => {
  try {
    const { newUser, token } = await signupUser(req);

 
    res.cookie("token", token, { httpOnly: true, secure: false });

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
      token // send token as response too
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { user, token } = await loginUser(req);

    res.cookie("token", token, { httpOnly: true, secure: false });

    res.status(200).json({
      message: "Login successful",
      user,
      token
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await Authentication.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    const newAdmin = new Authentication({
      name,
      email,
      password, 
      role: "admin", 
    });

    await newAdmin.save();

    res.status(201).json({
      message: "Admin registered successfully",
      admin: {
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { signup, login, registerAdmin };
