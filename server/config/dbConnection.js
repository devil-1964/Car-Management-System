require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    
    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1); // Exit the process with failure status
  }
};

module.exports = connectDB;
