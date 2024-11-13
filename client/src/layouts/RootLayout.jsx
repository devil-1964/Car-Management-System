import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import logo from "../assets/logo.png";
import { LogIn, Menu, User, LogOut } from 'lucide-react'; // Added User and LogOut icons

const RootLayout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(true); // Add authentication state
    const [user, setUser] = useState(null); // User state

    const toggleDrawer = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);

        // Simulate authentication status (replace with real authentication logic)
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full transition-all font-semibold font-mono duration-300 ${isScrolled
                    ? 'bg-white shadow-md text-[var(--color-black)]'
                    : 'bg-transparent text-red-700'
                    }`}
            >
                <nav className="container mx-auto flex items-center justify-between p-4">
                    <Link to="/dashboard" className="flex items-center gap-1 text-2xl font-bold text-[var(--color-black)]">
                        <div><img src={logo} className='w-10 ' alt="Logo" /></div>
                        TheCars
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-4">
                        {isAuthenticated ? (
                            <>
                                <div className="flex items-center gap-2">
                                    <User className="w-5" />
                                    <span>{user?.name}</span>
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
                <nav className="flex flex-col space-y-4">
                    {isAuthenticated ? (
                        <>
                            <div className="flex items-center gap-2 text-white">
                                <User className="w-5" />
                                <span>{user?.name}</span>
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
                                className=" flex items-center gap-1 hover:bg-[var(--color-orange-200)] p-2 rounded"
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
            <main className="pt-16 h-screen ">
                <Outlet />
            </main>
        </>
    );
};

export default RootLayout;
