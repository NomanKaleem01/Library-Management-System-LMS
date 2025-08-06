const { signupUser, loginUser, registerAdminService } = require("../services/authentication");
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
    const result = await registerAdminService(req);
    res.status(result.status).json(result.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = { signup, login, registerAdmin };
