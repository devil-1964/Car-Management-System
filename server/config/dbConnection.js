require('dotenv').config();
const mongoose = require('mongoose');
// console.log(process.env.MONGO_URL)

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    
    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.stack}`);
    process.exit(1); 
  }
};

module.exports = connectDB;
