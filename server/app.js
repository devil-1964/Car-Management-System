const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger/swagger');
const app = express();

 connectDB();


app.use(cors({
    origin: process.env.FRONTEND_API,
    credentials: true,
}));

app.use(express.json());
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/cars", require("./routes/carRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
