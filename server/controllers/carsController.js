const Car = require("../models/carsModel");
const asyncHandler = require("express-async-handler");

// Fetch all cars belonging to the authenticated user
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
 */
const getCars = asyncHandler(async (req, res) => {
  const cars = await Car.find({ user_id: req.user.id });
  res.status(200).json(cars);
});

// Fetch a single car
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
 */
const getCar = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (!car) {
    res.status(404);
    throw new Error("Car not found");
  }
  if (car.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User doesn't have permission to read other user's data");
  }
  res.status(200).json(car);
});

// Update a car
/**
 * @swagger
 * /api/cars/{id}:
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
 */
const updateCar = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (!car) {
    res.status(404);
    throw new Error("Car not found");
  }
  if (car.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User doesn't have permission to edit other user's data");
  }

  const updatedCar = await Car.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  );
  res.status(200).json(updatedCar);
});

// Create a new car
/**
 * @swagger
 * /api/cars:
 *   post:
 *     summary: Create a new car
 *     description: Create a new car listing for the authenticated user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               description:
 *                 type: string
 *               img:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: The created car object
 *       400:
 *         description: Missing fields or car with the same title already exists
 */
const createCar = asyncHandler(async (req, res) => {
  const { title, tags, description, img } = req.body;

  if (!title || !description || !tags) {
    res.status(400);
    throw new Error("Title, description, and tags are mandatory");
  }

  const existingCar = await Car.findOne({
    user_id: req.user.id,
    title: title,
  });
  if (existingCar) {
    res.status(400);
    throw new Error("Car with the same title already exists");
  }

  const car = await Car.create({
    user_id: req.user.id,
    title,
    tags,
    description,
    img,
  });
  res.status(201).json(car);
});

// Delete a car
/**
 * @swagger
 * /api/cars/{id}:
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
const deleteCar = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (!car) {
    res.status(404);
    throw new Error("Car not found");
  }
  if (car.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User doesn't have permission to delete other user's data");
  }

  await Car.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "Car deleted successfully" });
});

module.exports = {
  getCars,
  getCar,
  updateCar,
  createCar,
  deleteCar,
};
