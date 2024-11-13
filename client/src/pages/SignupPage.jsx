import  { useState } from 'react';
import car from "../assets/raceCar.png"

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to the backend)
    console.log(formData);
  };

  return (
    <div
  className="flex h-full bg-orange-400 "
  style={{
    backgroundImage: `url(${car})`,
    backgroundRepeat: 'repeat',
    backgroundSize: 'auto',
    backgroundPosition: 'cover',
  }}
>
      <div className="hidden md:flex flex-1 bg-cover bg-center text-white  items-center justify-center"  >
        <h1 className="text-6xl text-red-600 font-bold pl-6">Welcome to <br/><span className='text-6xl'>Car Management System</span></h1>
      </div>

      <div className="flex-1 flex items-center justify-center  dark:bg-gray-800 py-6">
        <div className=" dark:bg-gray-900 p-8 rounded-xl  w-full max-w-md">
          <h2 className="text-3xl font-semibold text-center text-red-500 dark:text-white mb-6">
            Create an Account
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-white dark:text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
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
                name="email"
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="********"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Sign Up
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
