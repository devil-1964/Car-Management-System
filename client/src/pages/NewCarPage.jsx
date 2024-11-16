import React, { useState } from 'react';
import axios from 'axios';
import { LoaderPinwheel, UploadCloud } from "lucide-react";
import toast from 'react-hot-toast';

const NewCarPage = () => {
  const [carDetails, setCarDetails] = useState({
    title: '',
    tags: [],
    description: '',
    img: []
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cloudName = 'dldnaxblm';
  const uploadPreset = 'carsModel';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'tags') {
      const tagsArray = value.split(',').map(tag => tag.trim());
      setCarDetails({ ...carDetails, [name]: tagsArray });
    } else {
      setCarDetails({ ...carDetails, [name]: value });
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError(null);
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );

      const uploadedImageUrl = response.data.secure_url;

      toast.success("Image Added Successfully");

      setCarDetails((prevDetails) => {
        const updatedImages = [...prevDetails.img, uploadedImageUrl];
        console.log("Updated carDetails:", { ...prevDetails, img: updatedImages });
        return { ...prevDetails, img: updatedImages };
      });

      e.target.value = '';
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error("Error uploading image");
      setError(error.response ? error.response.data.error.message : 'Failed to upload image, please try again.');
    } finally {
      setLoading(false);
    }
  };

  const saveCarDetails = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/cars`,
        carDetails,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            'Content-Type': 'application/json'
          }
        }
      );

      toast.success('Car details saved successfully');
      setCarDetails({
        title: '',
        tags: [],
        description: '',
        img: []
      });

      setError(null);
      setLoading(false);
    } catch (error) {
      console.error('Error saving car details:', error);
      toast.error('Failed to save car details, please try again.');
      setLoading(false);
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
              autoComplete='off'
              placeholder="Enter car title"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              name="tags"
              value={carDetails.tags.join(',')}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
              autoComplete='off'
              placeholder="e.g.Honda, Luxury, Sedan"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              name="description"
              value={carDetails.description}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
              autoComplete='off'
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
            disabled={loading}
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
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default NewCarPage;
