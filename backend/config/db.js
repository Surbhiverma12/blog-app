const mongoose = require('mongoose');


const mongoURI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
          serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
          socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
          family: 4 // Use IPv4, sometimes helps with connection issues
        });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    process.exit(1);
  }
};


module.exports = connectDB;