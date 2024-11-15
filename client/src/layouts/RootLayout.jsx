import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";
import { LogIn, Menu, User, LogOut, Home } from 'lucide-react';
import { useRecoilState } from 'recoil';
import { userState, isLoggedInState } from '../atoms/authState'; // Import Recoil state
import axios from 'axios';

const RootLayout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [user, setUser] = useRecoilState(userState); // Recoil state for user
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState); // Recoil state for login status
    const navigate = useNavigate();

    const toggleDrawer = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Fetch user data after login
    const fetchUserData = async () => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/current`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data) {
                    // console.log(response.data)
                    setUser(response.data); // Set the user data in Recoil
                    // console.log(response.data)
                    setIsLoggedIn(true); // Set the login state to true
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setIsLoggedIn(false); // If error, set loggedIn state to false
            }
        }
        else {
            setUser(null);
            setIsLoggedIn(false);
        }
    };

    useEffect(() => {
        // Check if the user is logged in
        const token = localStorage.getItem('accessToken');
        if (token) {
            fetchUserData(); // If token exists, fetch user data
        }
    }, []); // Empty dependency array, run once on component mount

    const handleLogout = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem("accessToken"); // Clear token from localStorage
        localStorage.removeItem("loggedIn"); // Clear token from localStorage
        setIsOpen(false);
        navigate('/login'); // Redirect to login page
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full transition-all font-semibold font-mono duration-300 flex justify-center ${isScrolled
                    ? 'bg-white shadow-md text-[var(--color-black)]'
                    : 'bg-transparent text-red-700'
                    }`}
            >
                <nav className="container flex items-center justify-between py-4">
                    <Link to="/dashboard" className="flex items-center gap-1 text-2xl font-bold text-[var(--color-black)]">
                        <div><img src={logo} className='w-10 ' alt="Logo" /></div>
                        TheCars
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-4">
                        {isLoggedIn ? (
                            <>
                                <div className="flex items-center gap-2 hover:text-black">
                                    <Link to="/dashboard">
                                        <Home className="w-5" />
                                    </Link>
                                </div>
                                <div className="flex items-center gap-2">
                                    <User className="w-5" />
                                    <span className='text-black text-sm'>{user?.username || "User"}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="hover:text-[var(--color-black)] flex items-center gap-2"
                                >
                                    <LogOut className="w-5" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="hover:text-[var(--color-black)] flex items-center gap-2"
                                >
                                    <LogIn className="w-5" />
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="hover:text-[var(--color-black)]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Navigation - Hamburger Menu */}
                    <button
                        className="md:hidden text-2xl text-[var(--color-black)]"
                        onClick={toggleDrawer}
                    >
                        <Menu className="text-red-600" />
                    </button>
                </nav>
            </header>

            {/* Left-Side Drawer for Mobile */}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-[var(--color-orange-500)] text-white p-4 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <button
                    onClick={toggleDrawer}
                    className="text-white text-2xl mb-4 focus:outline-none"
                >
                    &times;
                </button>
                <nav className="flex flex-col space-y-2">
                    {isLoggedIn ? (
                        <>
                            <div className="ml-2 flex items-center gap-2 text-white">
                                <User className="w-5" />
                                <span>{user?.username || "User"}</span>
                            </div>
                            <div className="hover:bg-[var(--color-orange-200)] p-2 rounded flex items-center gap-2 text-white">
                                <Link to="/dashboard" className='flex gap-2' onClick={toggleDrawer}>
                                    <Home className="w-5" />
                                    Home
                                </Link>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="hover:bg-[var(--color-orange-200)] p-2 rounded flex items-center gap-2"
                            >
                                <LogOut className="w-5" />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="flex items-center gap-1 hover:bg-[var(--color-orange-200)] p-2 rounded"
                                onClick={toggleDrawer}
                            >
                                Login
                                <LogIn className="w-5" />
                            </Link>
                            <Link
                                to="/register"
                                className="hover:bg-[var(--color-orange-200)] p-2 rounded"
                                onClick={toggleDrawer}
                            >
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </div>

            {/* Backdrop for Mobile Drawer */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40"
                    onClick={toggleDrawer}
                ></div>
            )}

            {/* Main Content */}
            <main className="pt-16 h-screen flex justify-center">
                <Outlet />
            </main>
        </>
    );
};

export default RootLayout;
