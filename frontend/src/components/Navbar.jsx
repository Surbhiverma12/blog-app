import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState('login');
  const navigate = useNavigate();

  // Function to handle modal state and type
  const handleAuthClick = (type) => {
    setAuthType(type);
    setIsAuthModalOpen(true);
  };

  // Function to handle modal close
  const handleModalClose = (newType) => {
    if (newType) {
      // If a new type is provided, switch the modal type
      setAuthType(newType);
    } else {
      // Otherwise, close the modal
      setIsAuthModalOpen(false);
    }
  };

  return (
    <>
      <nav className={`fixed w-full bg-gray-900 bg-opacity-80 backdrop-blur-md z-40 
        ${isAuthModalOpen ? 'filter blur-sm' : ''}`}>
        <div className="container mx-auto flex justify-between items-center px-4 py-4">
          {/* Logo */}
          <div 
            className="text-2xl font-bold text-blue-100 cursor-pointer" 
            onClick={() => navigate('/')}
          >
            BlogSpot
          </div>

          {/* Authentication Buttons */}
          <div className="flex space-x-4">
            <button 
              onClick={() => handleAuthClick('login')}
              className="bg-transparent border border-blue-500 text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors"
            >
              Login
            </button>
            <button 
              onClick={() => handleAuthClick('signup')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <AuthModal 
          isOpen={isAuthModalOpen}
          onClose={handleModalClose}
          type={authType}
        />
      )}
    </>
  );
};

export default Navbar;