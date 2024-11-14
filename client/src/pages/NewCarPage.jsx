import React, { useState } from 'react';
import { UploadCloud, X } from "lucide-react";

const ImageUploader = ({ images, setImages }) => {
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 10);
        const newImages = files.map(file => URL.createObjectURL(file));
        setImages(prevImages => [...prevImages, ...newImages]);
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    return (
        <div className="my-2 flex flex-row gap-2 items-center">
            <button
                onClick={() => document.getElementById('imageUpload').click()}
                className="bg-gray-400 items-center max-sm:px-5 gap-2 flex flex-row font-semibold border-4 border-gray-300 border-dashed text-white p-2 w-fit rounded-md hover:bg-gray-500"
            >
                <UploadCloud className='w-5 h-5' /><span className='max-sm:hidden'>
                Upload Images</span>
            </button>
            <input
                type="file"
                id="imageUpload"
                multiple
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
            />
        </div>
    );
};

const NewCarPage = () => {
    const [carDetails, setCarDetails] = useState({
        title: '',
        tags: '',
        description: '',
        images: [
            "https://via.placeholder.com/300x200.png?text=Car+Image+1",
            "https://via.placeholder.com/300x200.png?text=Car+Image+2",
            "https://via.placeholder.com/300x200.png?text=Car+Image+2",
            "https://via.placeholder.com/300x200.png?text=Car+Image+1",
            "https://via.placeholder.com/300x200.png?text=Car+Image+2",
            "https://via.placeholder.com/300x200.png?text=Car+Image+2",
            "https://via.placeholder.com/300x200.png?text=Car+Image+1",
            "https://via.placeholder.com/300x200.png?text=Car+Image+2",
            "https://via.placeholder.com/300x200.png?text=Car+Image+2",
            "https://via.placeholder.com/300x200.png?text=Car+Image+1",
    
        ]
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCarDetails({ ...carDetails, [name]: value });
    };

    const saveCarDetails = () => {
        console.log("Car Details Saved:", carDetails);
    };

    return (
        <div className="mx-16 mt-2">
            <h1 className="text-3xl font-semibold mb-6">Add New Car</h1>
            <div className="flex flex-row flex-wrap-reverse gap-8">
                <div className="w-[40vw] max-sm:w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                        {carDetails.images.map((img, index) => (
                            <div key={index} className="relative w-full h-24">
                                <img
                                    src={img}
                                    alt="Uploaded Car"
                                    className="object-cover rounded-md w-full h-full"
                                />
                                <button
                                    onClick={() => setCarDetails({
                                        ...carDetails,
                                        images: carDetails.images.filter((_, i) => i !== index)
                                    })}
                                    className="absolute top-1 right-1 bg-white p-1 rounded-full hover:bg-gray-200"
                                >
                                    <X className="w-4 h-4 text-red-600" />
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
                            value={carDetails.tags}
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
                <ImageUploader images={carDetails.images} setImages={(images) => setCarDetails({ ...carDetails, images })} />

                <button
                    onClick={saveCarDetails}
                    className="bg-green-500 font-semibold text-white px-6 py-3 rounded-lg hover:bg-green-600"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default NewCarPage;
