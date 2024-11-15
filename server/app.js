const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cloudinary = require("cloudinary").v2; // Import cloudinary SDK
const app = express();

// Connect to database
 connectDB();

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, // Cloudinary cloud name
    api_key: process.env.CLOUD_API_KEY, // Cloudinary API key
    api_secret: process.env.CLOUD_API_SECRET // Cloudinary API secret
});

// Enable CORS for specific domain (you can add more if needed)
app.use(cors({
    origin: ["http://localhost:5173",process.env.FRONTEND_API,"https://car-management-system-devil-1964s-projects.vercel.app"],
    credentials: true,
}));

app.use(express.json());

// Set up your routes
app.use("/api/cars", require("./routes/carRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
