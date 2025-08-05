require('dotenv').config();
const express = require('express');
const connectDB = require('./dbconnection/connection'); 
const authenticationroutes = require('./routes/authentication');
const cookieParser = require('cookie-parser');
const bookRoutes = require("./routes/bookroutes");
const bookRequestRoutes = require("./routes/bookrequest"); 

const PORT = process.env.PORT || 8080;

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser()); 

// DB Connection
connectDB(process.env.MONGO_URL);

// Routes
app.use('/api/auth', authenticationroutes); 
app.use('/api/books', bookRoutes); 
app.use('/api/book-requests', bookRequestRoutes); 

// Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
