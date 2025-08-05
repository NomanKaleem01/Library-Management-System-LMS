const mongoose = require("mongoose");

const connectDB = async (url) => {
  try {
    await mongoose.connect(url); // ✅ Extra options ki zarurat nahi
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};
module.exports = connectDB;