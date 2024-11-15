const mongoose = require("mongoose");

const carSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",    },
    title: {
      type: String,
      required: [true, "Please add the car title"],
    },
    tags: [
      {
        type: String, 
        required: [true, "Please add a tags for the car"],
      },
    ],
    description: {
      type: String,
      required: [true, "Please add a description for the car"],
    },
    img: [
      {
        type: String, // Array of objects to store images or related data (e.g., URL, metadata)
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Car", carSchema);
