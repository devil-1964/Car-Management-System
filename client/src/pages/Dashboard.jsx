import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowUp, Grid, List, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const [isCardView, setIsCardView] = useState(false);
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cars`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                });
                setCars(response.data);
                // console.log(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cars:', error);
                setError('Error fetching car data');
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    const SampleNextArrow = (props) => {
        const { onClick } = props;
        return (
            <ChevronRight
                className="text-orange-500 h-10 w-10 absolute z-50 bg-white rounded-full shadow-lg cursor-pointer hover:bg-orange-50"
                style={{ right: '-30px', top: '50%', transform: 'translateY(-50%)' }}
                onClick={onClick}
            />
        );
    };

    const SamplePrevArrow = (props) => {
        const { onClick } = props;
        return (
            <ChevronLeft
                className="text-orange-500 h-10 w-10 absolute z-50 bg-white rounded-full shadow-lg cursor-pointer hover:bg-orange-50"
                style={{ left: '-30px', top: '50%', transform: 'translateY(-50%)' }}
                onClick={onClick}
            />
        );
    };

    const settings = {
        slidesToShow: 4,
        slidesToScroll: 2,
        lazyLoad: true,
        infinite: false,
        dots: true,
        speed: 500,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2 } },
            { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    };

    const sortedCars = cars
        .filter(car => car.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => (sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)));

    const toggleView = () => setIsCardView(!isCardView);
    const toggleSortOrder = () => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');

    return (
        <div className='container max-sm:px-8 px-6'>
            <div className='flex justify-between font-semibold items-center flex-wrap gap-2'>
                <div className='text-xl sm:text-2xl text-orange-700'>My Cars</div>
                <div className='flex gap-3'>
                    <input
                        type="text"
                        placeholder="Search by title..."
                        className="p-2 border rounded-md"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={() => { navigate('/dashboard/new') }} className='flex bg-orange-400 hover:bg-gray-300 p-2 rounded-md items-center gap-1'>
                        <Plus /> <span className='max-sm:hidden'>Add new Car</span>
                    </button>
                </div>
            </div>

            <div className='flex md:flex-row gap-3 text-sm mt-4 max-sm:flex-col sm:items-start w-fit sm:gap-2 sm:mt-6'>
                <button onClick={toggleSortOrder} className='bg-gray-100 text-black p-2 rounded-md'>
                    {sortOrder === 'asc' ? (
                        <div className='flex gap-1 items-center'>Sort by Ascending<ArrowUp className='h-5' /></div>
                    ) : (
                        <div className='flex gap-1 items-center'>Sort by Descending<ArrowDown className='h-5' /></div>
                    )}
                </button>
                <button onClick={toggleView} className='bg-gray-100 text-black p-2 rounded-md'>
                    {isCardView ? (
                        <div className='flex items-center gap-1'><Grid className='h-5' /> Grid</div>
                    ) : (
                        <div className='flex items-center gap-1'><List className='h-5' /> List</div>
                    )}
                </button>
            </div>

            <div className="mt-6">
                {loading ? (
                    <div>Loading...</div> 
                ) : error ? (
                    <div>{error}</div> 
                ) : isCardView ? (
                    <Slider {...settings} className="slider-container gap-4">
                        {sortedCars.map(car => (
                            <div
                                key={car._id}
                                onClick={()=>navigate(`/dashboard/${car._id}`)}
                                className='cursor-pointer p-4 hover:bg-gray-100 border rounded-md shadow-md hover:shadow-lg transition-all flex justify-between flex-col h-[260px]'
                            >
                                <div>
                                    <img
                                        src={car.img && car.img[0] ? car.img[0] : "https://www.aiscribbles.com/img/variant/large-preview/8989/?v=1f4774"} 
                                        alt={car.img && car.img[0] ? car.title: "Car image"}
                                        className='w-full h-40 object-contain rounded-md mb-2'
                                    />
                                </div>
                                <div>
                                    <h3 className='text-lg font-semibold'>{car.title}</h3>
                                    <div className="bg-yellow-100 w-fit text-yellow-600 px-4 py-1 rounded-full text-sm">
                                        {car.tags && car.tags.length > 0 ? car.tags[0] : 'No Tag'}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <table className="min-w-full table-auto mt-6">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-3 px-4 text-left font-medium text-gray-700">Title</th>
                                <th className="py-3 px-4 text-center font-medium text-gray-700">Tag</th>
                                <th className="py-3 px-4 text-center font-medium text-gray-700 max-sm:hidden">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedCars.map(car => (
                                <tr onClick={()=>navigate(`/dashboard/${car._id}`)} key={car._id} className="border-t hover:bg-gray-50 transition-all cursor-pointer">
                                    
                                    <td className="py-3 px-4 text-gray-900">{car.title}</td>
                                    <td className="py-3 px-4 text-center">
                                        <span className="bg-yellow-100 text-yellow-600 px-4 py-1 rounded-full text-sm">
                                            {car.tags && car.tags.length > 0 ? car.tags[0] : 'No Tag'}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-center text-gray-600 max-sm:hidden">{car.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
