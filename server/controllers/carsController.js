const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const Car = require("../models/carsModel");
const asyncHandler = require("express-async-handler");

const uploadImage = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "cars",
      resource_type: "image",
    });
    return result.secure_url; // Cloudinary image URL
  } catch (err) {
    throw new Error("Image upload failed");
  }
};

// Fetch all cars belonging to the authenticated user
const getCars = asyncHandler(async (req, res) => {
  const cars = await Car.find({ user_id: req.user.id });
  res.status(200).json(cars);
});

// Fetch a single car
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

  // Check for images and upload to Cloudinary
  let imgUrls = [];
  if (req.files && req.files.length > 0) {
    imgUrls = await Promise.all(
      req.files.map((file) => uploadImage(file))
    );
  }

  // Update the car details
  const updatedCar = await Car.findByIdAndUpdate(
    req.params.id,
    { ...req.body, img: imgUrls },
    { new: true }
  );
  res.status(200).json(updatedCar);
});

// Create a new car
const createCar = asyncHandler(async (req, res) => {
  const { title, tags, description } = req.body;

  // Validate that required fields are provided
  if (!title || !description || !tags) {
    res.status(400);
    throw new Error("Title, description, and tags are mandatory");
  }

  // Check if a car with the same title already exists for the user
  const existingCar = await Car.findOne({
    user_id: req.user.id,
    title: title,
  });
  if (existingCar) {
    res.status(400);
    throw new Error("Car with the same title already exists");
  }

  // Check for images and upload to Cloudinary
  let imgUrls = [];
  if (req.files && req.files.length > 0) {
    imgUrls = await Promise.all(
      req.files.map((file) => uploadImage(file))
    );
  }

  // Create the new car document
  const car = await Car.create({
    user_id: req.user.id,
    title,
    tags,
    description,
    img: imgUrls, // Store image URLs
  });
  res.status(201).json(car);
});

// Delete a car
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

  // Delete the car
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
