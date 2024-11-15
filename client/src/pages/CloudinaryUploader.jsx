import React, { useState } from 'react';
import { CloudinaryContext, Image, Video, Transformation } from 'cloudinary-react';
import axios from 'axios';

const CloudinaryUploader = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // Cloudinary upload preset and API key setup
  const cloudName = 'dldnaxblm';  // Replace with your Cloudinary cloud name
  const uploadPreset = 'carsModel';  // Replace with your upload preset (set in Cloudinary settings)

  const handleUpload = async (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setLoading(true);

      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      try {
        // Uploading to Cloudinary
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        );

        // Get the URL of the uploaded image
        const uploadedImageUrl = response.data.secure_url;
        setImageUrl(uploadedImageUrl);

        setLoading(false);
      } catch (error) {
        console.error('Error uploading image:', error);
        setLoading(false);
      }
    }
  };

  return (
    <CloudinaryContext cloudName={cloudName}>
      <div className="flex flex-col items-center p-5">
        <h1 className="text-xl font-semibold mb-4">Cloudinary Image Uploader</h1>
        
        {/* File Upload */}
        <input
          type="file"
          onChange={handleUpload}
          accept="image/*"
          className="mb-4"
        />

        {loading && <p>Uploading...</p>}

        {imageUrl && (
          <div>
            <h2 className="text-lg font-semibold">Uploaded Image:</h2>
            <img src={imageUrl} alt="Uploaded" className="mt-4 w-64 h-64 object-cover rounded-md" />
            <div className="mt-4">
              <p className="text-sm font-medium">Image URL:</p>
              <input
                type="text"
                readOnly
                value={imageUrl}
                className="border p-2 w-full rounded-md"
              />
            </div>
          </div>
        )}
      </div>
    </CloudinaryContext>
  );
};

export default CloudinaryUploader;
