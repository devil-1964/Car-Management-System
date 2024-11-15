const express = require("express");
const multer = require("multer"); // For file uploads
const router = express.Router();
const {
  getCars,
  getCar,
  updateCar,
  createCar,
  deleteCar,
} = require("../controllers/carsController");
const validateToken = require("../middleware/validateTokenHandler");

// Multer setup to handle file uploads
const upload = multer({ dest: "uploads/" }); // Images will be temporarily saved in "uploads" folder

router.use(validateToken); // Ensure user is authenticated

// Routes for cars
router.route("/")
  .get(getCars) // Get all cars
  .post(upload.array("images", 10), createCar); // Upload images and create car

router.route("/:id")
  .get(getCar) // Get a specific car by ID
  .put(upload.array("images", 10), updateCar) // Upload images and update car
  .delete(deleteCar); // Delete a car by ID

module.exports = router;
