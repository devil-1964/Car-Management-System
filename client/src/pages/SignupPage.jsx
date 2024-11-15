import React, { useState } from 'react';
import axios from 'axios';
import car from "../assets/raceCar.png";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const navigate=useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;  // 'name' corresponds to input name attributes
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/register`, formData);

            if (response.status === 201) {
                toast.success('Registration successful!');
                navigate("/login")
                // Redirect to login page or other actions
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || 'An error occurred. Please try again.');
            } else {
                toast.error('Network error. Please check your connection.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="flex h-full w-full bg-orange-400"
            style={{
                backgroundImage: `url(${car})`,
                backgroundRepeat: 'repeat',
                backgroundSize: 'auto',
                backgroundPosition: 'cover',
            }}
        >
            <div className="hidden md:flex flex-1 bg-cover bg-center text-white items-center justify-center">
                <h1 className="text-6xl text-red-600 font-bold pl-6">
                    Welcome to <br />
                    <span className='text-6xl'>Car Management System</span>
                </h1>
            </div>

            <div className="flex-1 flex items-center justify-center dark:bg-gray-800 py-6">
                <div className="dark:bg-gray-900 p-8 rounded-xl w-full max-w-md">
                    <h2 className="text-3xl font-semibold text-center text-red-500 dark:text-white mb-6">
                        Create an Account
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-white dark:text-gray-300 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"  // 'username' is now correctly referenced here
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="John Doe"
                                autoComplete='off'
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-white dark:text-gray-300 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"  // 'email' is referenced here
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="johndoe@example.com"
                                autoComplete='off'
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-white dark:text-gray-300 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"  // 'password' is referenced here
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="********"
                                pattern="^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$"
                                title="Password must contain at least one letter, one number, one special character, and be at least 6 characters long."
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="text-center mt-6">
                        <p className="text-white dark:text-gray-400">
                            Already have an account?{' '}
                            <a href="/login" className="text-black hover:text-red-600">
                                Log in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
