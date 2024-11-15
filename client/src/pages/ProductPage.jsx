import { ChevronLeft, ChevronRight, Edit2, Trash2, Upload, UploadCloud, X } from "lucide-react";
import { useState } from "react";
import Slider from "react-slick";

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
    const [car, setCar] = useState({
        id: 1,
        title: "Luxury Sedan",
        tags: ["Luxury", "Comfort"],
        description: "A luxurious car with premium features.",
        images: [
            "https://www.aiscribbles.com/img/variant/large-preview/8989/?v=1f4774",
            "https://www.aiscribbles.com/img/variant/large-preview/8989/?v=1f4774",
            "https://www.aiscribbles.com/img/variant/large-preview/8989/?v=1f4774",
            "https://www.aiscribbles.com/img/variant/large-preview/8989/?v=1f4774",
            "https://www.aiscribbles.com/img/variant/large-preview/8989/?v=1f4774",
            "https://www.aiscribbles.com/img/variant/large-preview/8989/?v=1f4774",
            "https://www.aiscribbles.com/img/variant/large-preview/8989/?v=1f4774",
            "https://www.aiscribbles.com/img/variant/large-preview/8989/?v=1f4774",
            "https://www.aiscribbles.com/img/variant/large-preview/8989/?v=1f4774",
            "https://www.aiscribbles.com/img/variant/large-preview/8989/?v=1f4774",
            "https://www.aiscribbles.com/img/variant/large-preview/8989/?v=1f4774",
            "https://www.aiscribbles.com/img/variant/large-preview/8989/?v=1f4774",
            "https://www.aiscribbles.com/img/variant/large-preview/8989/?v=1f4774",
            // Add more images here
        ],
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editCar, setEditCar] = useState(car);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditCar({ ...editCar, [name]: value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.slice(0, 10).map(file => URL.createObjectURL(file));
        setEditCar({ ...editCar, images: newImages });
    };

    const removeImage = (indexToRemove) => {
        setEditCar({
            ...editCar,
            images: editCar.images.filter((_, index) => index !== indexToRemove),
        });
    };

    const saveChanges = () => {
        setCar(editCar);
        setIsModalOpen(false);
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

    return (
        <div className="mx-24 max-sm:mx-8">
            <h1 className="text-4xl font-semibold">Car Details</h1>
            <div className="flex flex-row max-sm:flex-wrap">
                <div className="w-[50vw] max-md:w-[90vw]">
                    <Slider {...settings} className="slider-container gap-4">
                        {car.images.map((img, index) => (
                            <div key={index} className="w-full border rounded-md shadow-md hover:shadow-lg transition-all flex justify-between flex-col h-[360px] max-sm:h-auto">
                                <img src={img} alt="Car" className="w-fit mx-auto h-full object-center rounded-md mb-2" />
                            </div>
                        ))}
                    </Slider>
                </div>
                <div className="pl-6 pt-10 text-xl font-mono flex flex-col">
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
                        <button className="flex text-sm bg-red-500 p-1.5 rounded-md hover:bg-gray-400 items-center gap-1">
                            <Trash2 className="w-4" />Delete
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md transition-all transform">
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
                                <button className="bg-gray-400  border-4  max-sm:mx-auto border-gray-300 border-dashed flex gap-2 text-white py-2 px-4 rounded">
                                   <UploadCloud/> <span className=" max-sm:hidden">Upload Images</span>
                                </button>
                            </div>
                            <div className="gap-2 mt-2 flex flex-row overflow-x-auto imgScroll">
                                {editCar.images.slice(0, 10).map((img, index) => (
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
        </div>
    );
};

export default ProductPage;
