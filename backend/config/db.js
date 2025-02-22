const mongoose = require('mongoose');


const mongoURI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB Connection Error:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    process.exit(1);
  }
};


module.exports = connectDB;