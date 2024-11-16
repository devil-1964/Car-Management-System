const express = require("express");
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

router.use(validateToken); // Ensure user is authenticated

/**
 * @swagger
 * /api/cars:
 *   get:
 *     summary: Get all cars of the authenticated user
 *     description: Fetch all cars for the currently authenticated user
 *     responses:
 *       200:
 *         description: List of cars belonging to the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *   post:
 *     summary: Create a new car
 *     description: Create a new car listing for the authenticated user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *     responses:
 *       201:
 *         description: The created car object
 *       400:
 *         description: Missing fields or car with the same title already exists
 */
router.route("/")
  .get(getCars) // Get all cars
  .post(createCar); // Upload images and create car

/**
 * @swagger
 * /api/cars/{id}:
 *   get:
 *     summary: Get a specific car by ID
 *     description: Fetch a car by its ID if it belongs to the authenticated user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the car to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The car object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: Car not found
 *       403:
 *         description: User doesn't have permission to access this car
 *   put:
 *     summary: Update a car
 *     description: Update the car details by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the car to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       200:
 *         description: The updated car object
 *       404:
 *         description: Car not found
 *       403:
 *         description: User doesn't have permission to edit this car
 *   delete:
 *     summary: Delete a car
 *     description: Delete a car listing by ID if it belongs to the authenticated user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the car to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car deleted successfully
 *       404:
 *         description: Car not found
 *       403:
 *         description: User doesn't have permission to delete this car
 */
router.route("/:id")
  .get(getCar) // Get a specific car by ID
  .put(updateCar) // Upload images and update car
  .delete(deleteCar); // Delete a car by ID

module.exports = router;
