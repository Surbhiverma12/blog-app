require('dotenv').config();
const express = require("express");
// const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/PostRoutes");
const reviewRoutes = require('./routes/reviewRoutes.js');

connectDB(); // Connect to MongoDB

const app = express();

app.use(cors());
app.use(express.json()); 

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);  
app.use('/api', reviewRoutes);


app.get("/", (req, res) => {
    res.send("Blog Backend is Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
