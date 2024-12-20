import { ChevronLeft, ChevronRight, Edit2, Loader, LoaderPinwheel, Trash2, UploadCloud, X } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast"; // If you're using react-toastify for notifications

const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
        <ChevronRight
            className="text-orange-500 h-10 w-10 absolute z-50 bg-white rounded-full shadow-lg cursor-pointer hover:bg-orange-50"
            style={{ right: '0px', top: '50%', transform: 'translateY(-50%)' }}
            onClick={onClick}
        />
    );
};

const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
        <ChevronLeft
            className="text-orange-500 h-10 w-10 absolute z-50 bg-white rounded-full shadow-lg cursor-pointer hover:bg-orange-50"
            style={{ left: '0px', top: '50%', transform: 'translateY(-50%)' }}
            onClick={onClick}
        />
    );
};

const ProductPage = () => {
    const [car, setCar] = useState(null); // State for car details
    const [editCar, setEditCar] = useState(null); // State for editing car details
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const id = useParams(); // Get the car ID from URL params
    const navigate=useNavigate()

    const cloudName = 'dldnaxblm'; // Replace with your Cloudinary cloud name
    const uploadPreset = 'carsModel'; // Replace with your Cloudinary upload preset

    // Fetch car details from API
    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cars/${id.id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        'Content-Type': 'application/json',
                    }
                });
                setCar(response.data);
                setEditCar(response.data); // Set the initial state for editing
            } catch (error) {
                setError('Failed to fetch car details');
            }
        };

        fetchCarDetails();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditCar({ ...editCar, [name]: value });
    };

    const removeImage = (index) => {
        // Remove the image from the editCar state
        setEditCar(prevEditCar => {
            const updatedImages = [...prevEditCar.img];
            updatedImages.splice(index, 1); // Remove image at index
            return { ...prevEditCar, img: updatedImages };
        });
    
        // Remove the image from the car state (if necessary for real-time view)

    
        toast.success("Image removed successfully");
    };
    
    const deleteCar = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/cars/${id.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                }
            });
            toast.success("Car deleted successfully");
            // Redirect to another page after deletion (e.g., go back to the list of cars)
            setIsDeleteModalOpen(false);
            navigate("/dashboard")
        } catch (error) {
            setIsDeleteModalOpen(false);
            toast.error('Failed to delete car');
        }
    };


    // Handle image upload and validation
    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files); // Get the selected files
        if (files.length === 0) return; // Exit if no files selected
    
        // Reset previous error messages
        setError(null);
    
        // Start loading state
        setLoading(true);
    
        // Iterate over each selected file and upload to Cloudinary
        const newImages = [];
    
        for (let file of files) {
            // Validate file type and size
            if (!file.type.startsWith('image/')) {
                setError('Please select a valid image file.');
                break;
            }
            if (file.size > 5 * 1024 * 1024) { // 5MB size limit
                setError('File size exceeds 5MB.');
                break;
            }
    
            try {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', uploadPreset);
    
                // Send the request to Cloudinary for image upload
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                    formData
                );
    
                // Get the URL of the uploaded image
                const uploadedImageUrl = response.data.secure_url;
                newImages.push(uploadedImageUrl); // Add the image URL to the new images array
            } catch (error) {
                console.error('Error uploading image:', error);
                toast.error("Error uploading image");
                setError('Failed to upload image, please try again.');
                break; // Exit if an error occurs
            }
        }
    
        // After uploading all images, update the car details with the new image URLs
        if (newImages.length > 0) {
            // Update car images (in case of view mode)
            setCar(prevCar => {
                const updatedImages = [...prevCar.img, ...newImages];
                return { ...prevCar, img: updatedImages };
            });
    
            // Update editCar images (in case of editing)
            setEditCar(prevEditCar => {
                const updatedImages = [...prevEditCar.img, ...newImages];
                return { ...prevEditCar, img: updatedImages };
            });
    
            toast.success("Image(s) uploaded successfully");
        }
    
        setLoading(false); // End loading state
        e.target.value = ''; // Clear the file input
    };
    

    const saveChanges = async () => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/api/cars/${id.id}`,
                editCar,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    }
                }
            );
            setCar(response.data); // Update the car details after saving
            setIsModalOpen(false);
        } catch (error) {
            setError('Failed to save car details');
        }
    };

    const settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        lazyLoad: true,
        infinite: true,
        dots: true,
        speed: 500,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    if (!car) {
        return <div>Loading...</div>;
    }

    return (
        <div className="mx-24 max-sm:mx-8">
            <h1 className="text-4xl font-semibold">Car Details</h1>
            <div className="flex flex-row max-sm:flex-wrap">
                <div className="w-[50vw] max-md:w-[90vw]">
                {car.img && (car.img.length > 0) ?
                        (<Slider {...settings} className="slider-container gap-4">
                            {car.img.map((img, index) => (
                                <div key={index} className="w-full border rounded-md shadow-md hover:shadow-lg transition-all flex justify-between flex-col h-[360px] max-sm:h-auto">
                                    <img src={img} alt="Car" className="w-full mx-auto h-full object-cover rounded-md mb-2" />
                                </div>
                            ))}
                        </Slider>) : (<div className="items-center font-mono font-semibold h-full text-xl text-gray-600 justify-center max-w-[400px] min-w-[250px] bg-gray-100 w-full mt-5 border max-sm:w-fit mx-2 max-sm:mx-auto rounded-md shadow-md hover:shadow-lg transition-all flex  flex-col max-h-[400px] min-h-[160px] max-sm:h-auto">
                            No Image
                        </div>)}
                </div>
                <div className="pl-6 pt-10 text-xl font-mono flex flex-col mr-10">
                    <div className="border-b-2 border-gray-200 font-semibold">
                        <span>{car.title}</span>
                    </div>
                    <div className="md:mb-10 max-sm: mb-5">
                        <strong>Tags: </strong>
                        <div className="flex flex-wrap gap-2">
                            {car.tags.map((tag, idx) => (
                                <span key={idx} className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm">{tag}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <span>{car.description}</span>
                    </div>
                    <div className="flex justify-end gap-3 mt-auto pb-10 pt-3">
                        <button
                            className="flex bg-green-500 text-sm p-1.5 text-white rounded-md hover:bg-gray-400 items-center gap-1"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Edit2 className="w-4" />Edit
                        </button>
                        <button className="flex text-sm bg-red-500 p-1.5 rounded-md hover:bg-gray-400 items-center gap-1"  onClick={() => setIsDeleteModalOpen(true)} >
                            <Trash2 className="w-4" />Delete
                        </button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
                        <h2 className="text-2xl font-semibold mb-4">Edit Car Details</h2>
                        <div className="mb-2">
                            <label className="block font-semibold">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={editCar.title}
                                onChange={handleInputChange}
                                className="border p-2 rounded w-full"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block font-semibold">Tags (Comma Separated)</label>
                            <input
                                type="text"
                                name="tags"
                                value={editCar.tags.join(", ")}
                                onChange={(e) => setEditCar({ ...editCar, tags: e.target.value.split(",").map(tag => tag.trim()) })}
                                className="border p-2 rounded w-full"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block font-semibold">Description</label>
                            <textarea
                                name="description"
                                value={editCar.description}
                                onChange={handleInputChange}
                                className="border p-2 rounded w-full"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block font-semibold"></label>
                            <div className="relative">
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className="opacity-0 absolute w-full h-full cursor-pointer"
                                />
                                <button className="bg-gray-400 border-4 max-sm:mx-auto border-gray-300 border-dashed flex gap-2 text-white py-2 px-4 rounded">
                                    {loading ?<LoaderPinwheel  className="animate-spin"/> :<UploadCloud/>}<span className="max-sm:hidden">Upload Images</span>
                                </button>
                            </div>
                            <div className="gap-2 mt-2 flex flex-row overflow-x-auto imgScroll">
                                {editCar.img && editCar.img.length>0 && editCar.img.map((img, index) => (
                                    <div key={index} className="relative max-w-[100px] min-w-[90px] h-auto">
                                        <img
                                            src={img}
                                            alt="Car"
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                        <button
                                            onClick={() => removeImage(index)}
                                            className="absolute top-0 right-0 bg-white p-1 rounded-full hover:bg-gray-200"
                                        >
                                            <X className="w-4 h-4 text-red-600" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-end gap-4 mt-6">
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
                                onClick={saveChanges}
                            >
                                Save
                            </button>
                            <button
                                className="bg-gray-300 hover:bg-gray-500 text-black py-2 px-4 rounded"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
                        <h2 className="text-2xl font-semibold mb-4">Are you sure?</h2>
                        <p className="mb-4">This action cannot be undone.</p>
                        <div className="flex justify-end gap-4 mt-6">
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                                onClick={deleteCar}
                            >
                                Yes, Delete
                            </button>
                            <button
                                className="bg-gray-300 hover:bg-gray-500 text-black py-2 px-4 rounded"
                                onClick={() => setIsDeleteModalOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductPage;
