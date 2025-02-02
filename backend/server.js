require('dotenv').config();
const express = require("express");
// const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/PostRoutes");

// dotenv.config(); // Load environment variables
connectDB(); // Connect to MongoDB

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 
// app.use(bodyParser.json());

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);  


// Test Route
app.get("/", (req, res) => {
    res.send("Blog Backend is Running");
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
