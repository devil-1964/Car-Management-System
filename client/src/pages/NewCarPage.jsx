import React, { useState } from 'react';
import axios from 'axios';
import { LoaderPinwheel, UploadCloud } from "lucide-react";
import toast from 'react-hot-toast';

const NewCarPage = () => {
  const [carDetails, setCarDetails] = useState({
    title: '',
    tags: [],
    description: '',
    img: [] // Array of image URLs (no longer an array of objects)
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cloudinary details
  const cloudName = 'dldnaxblm'; // Replace with your Cloudinary cloud name
  const uploadPreset = 'carsModel'; // Replace with your Cloudinary upload preset

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'tags') {
      const tagsArray = value.split(',').map(tag => tag.trim());
      setCarDetails({ ...carDetails, [name]: tagsArray });
    } else {
      setCarDetails({ ...carDetails, [name]: value });
    }
  };

  // Handle image upload
  const handleImageChange = async (e) => {
    const file = e.target.files[0]; // Get the first file (only one at a time)
    if (!file) return; // If no file selected, exit

    // Reset previous error messages
    setError(null);

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError('File size exceeds 5MB.');
      return;
    }

    setLoading(true); // Start the loading state

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      // Upload the image to Cloudinary
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );

      // Get the URL of the uploaded image
      const uploadedImageUrl = response.data.secure_url;

      toast.success("Image Added Successfully");

      // Update the state using the functional form to ensure you're using the latest carDetails state
      setCarDetails((prevDetails) => {
        const updatedImages = [...prevDetails.img, uploadedImageUrl]; // Add the new image URL to the array
        console.log("Updated carDetails:", { ...prevDetails, img: updatedImages });

        return { ...prevDetails, img: updatedImages }; // Return the updated state
      });

      // Reset the file input after successful upload
      e.target.value = '';
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error("Error uploading image");
      setError(error.response ? error.response.data.error.message : 'Failed to upload image, please try again.');
    } finally {
      setLoading(false); // End the loading state
    }
  };

  // Save car details to server
  const saveCarDetails = async () => {
    setLoading(true); // Start loading

    try {
      // Send car details via a POST request to your backend
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/cars`,
        carDetails, // Pass carDetails as the body
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            'Content-Type': 'application/json' // Optional: Set Content-Type to JSON
          }
        }
      );

      // Handle the response after successful post
      toast.success('Car details saved successfully');

      // Optionally, clear the form after successful save
      setCarDetails({
        title: '',
        tags: [],
        description: '',
        img: []
      });

      // Reset error and loading states
      setError(null);
      setLoading(false);
    } catch (error) {
      console.error('Error saving car details:', error);
      toast.error('Failed to save car details, please try again.');
      setLoading(false); // End loading on error
    }
  };

  return (
    <div className="mx-16 mt-2">
      <h1 className="text-3xl font-semibold mb-6">Add New Car</h1>
      <div className="flex flex-row flex-wrap-reverse gap-8">
        <div className="w-[40vw] max-sm:w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {carDetails.img.map((img, index) => (
              <div key={index} className="relative w-fit h-24 p-1 bg-gray-200 rounded-md">
                {/* Ensure that img is a valid string URL before using it */}
                {img ? (
                  <img
                    src={img}
                    alt={carDetails.title}
                    className="object-cover rounded-md w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">No image</div>
                )}
                <button
                  onClick={() => {
                    setCarDetails({
                      ...carDetails,
                      img: carDetails.img.filter((_, i) => i !== index),
                    });
                  }}
                  className="absolute top-1 right-1 bg-white p-1 rounded-full hover:bg-gray-200"
                >
                  <span className="text-red-600">X</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col w-[40vw] max-sm:w-[80vw] gap-4">
          <div>
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={carDetails.title}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
              placeholder="Enter car title"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              name="tags"
              value={carDetails.tags.join(', ')}  // Show tags as a comma-separated string
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
              placeholder="e.g. Luxury, Sedan"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              name="description"
              value={carDetails.description}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
              placeholder="Enter car description"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-end gap-2">
        <div className="my-2 flex flex-row gap-2 items-center">
          <button
            onClick={() => document.getElementById('imageUpload').click()}
            className="bg-gray-400 items-center max-sm:px-5 gap-2 flex flex-row font-semibold border-4 border-gray-300 border-dashed text-white p-2 w-fit rounded-md hover:bg-gray-500"
            disabled={loading} // Disable button during loading
          >
            {!loading ? <UploadCloud className="w-5 h-5" /> : <div className="animate-spin w-5 h-5"><LoaderPinwheel /></div>}
            <span className="max-sm:hidden">Upload Image</span>
          </button>
          <input
            type="file"
            id="imageUpload"
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
        </div>

        <button
          onClick={saveCarDetails}
          className="bg-green-500 font-semibold text-white px-6 py-3 rounded-lg hover:bg-green-600"
          disabled={loading} // Disable save button during loading
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default NewCarPage;
