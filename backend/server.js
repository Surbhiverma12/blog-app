require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
// const postRoutes = require('./routes/posts');
const postRoutes = require('./routes/PostRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); 
app.use(express.urlencoded());

connectDB();

// routes
app.use('/api/posts', postRoutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

