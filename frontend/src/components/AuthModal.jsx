import React, { useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx'; // Import the auth context
import toast from 'react-hot-toast';
import Loader from './Loader';

const AuthModal = ({ isOpen, onClose, type }) => {
  const { user, login} = useAuth(); // Use the auth context
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (type === 'login') {
        const response = await axios.post(`${import.meta.env.VITE_MAP_API_URL}/api/auth/login`, {
          email: formData.email,
          password: formData.password,
        });
        login(response.data); // Use the login function from context
        toast.success(`Welcome, ${user?.name || 'User'}! ${response.data.message}`, { position: "top-right" }); 
        onClose(); // Close the modal after successful login
      } else {
        const response = await axios.post(`${import.meta.env.VITE_MAP_API_URL}/api/auth/signup`, {
          username: formData.username,
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        login(response.data); // Log the user in after successful signup
        toast.success(`Welcome, ${user?.name || 'User'}! ${response.data.message}`, { position: "top-right" })
        onClose(); // Close the modal
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during the request.');
      toast.error(error.response?.data?.message || "Something went wrong!", { position: "top-right" });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Function to switch between login and signup
  const toggleAuthType = () => {
    // Clear form data when switching
    setFormData({
      name: '',
      username: '',
      email: '',
      password: '',
    });
    // Call onClose with the new type to switch
    onClose(type === 'login' ? 'signup' : 'login');
  };

  if (loading) return <Loader />;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 relative">
        {/* Close Button */}
        <button
          onClick={() => onClose()}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X size={24} />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          {type === 'login' ? 'Welcome Back' : 'Create Account'}
        </h2>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'signup' && (
            <div>
              <label className="block text-gray-700 mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}

          {type === 'signup' && (
            <div>
              <label className="block text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors mt-6 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Processing...' : type === 'login' ? 'Log In' : 'Create Account'}
          </button>

          {/* Toggle between login and signup */}
          <p className="text-center text-gray-600 text-sm mt-4">
            {type === 'login' ? (
              <>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={toggleAuthType}
                  className="text-blue-600 hover:underline"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={toggleAuthType}
                  className="text-blue-600 hover:underline"
                >
                  Log in
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
