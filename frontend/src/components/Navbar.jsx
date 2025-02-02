import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, Home, BookOpen, Compass, PenSquare, LogOut } from 'lucide-react';
import AuthModal from './AuthModal';
import { useAuth } from '../context/AuthContext.jsx'; // Import the auth context

const Navbar = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState('login');
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth(); // Use the auth context

  const handleAuthClick = (type) => {
    setAuthType(type);
    setIsAuthModalOpen(true);
  };

  const handleModalClose = (newType) => {
    if (newType) {
      setAuthType(newType);
    } else {
      setIsAuthModalOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <nav className="fixed w-full bg-gray-900/75 backdrop-blur-md z-40 border-b border-gray-800/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div
              className="flex items-center space-x-2 cursor-pointer group"
              onClick={() => navigate('/')}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center transform group-hover:rotate-6 transition-transform">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent">
                BlogSpot
              </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <NavLink icon={<Home size={18} />} text="Home" onClick={() => navigate('/')} />
              <NavLink icon={<BookOpen size={18} />} text="Posts" onClick={() => navigate('/posts')} />
              <NavLink icon={<Compass size={18} />} text="Explore" onClick={() => navigate('/explore')} />
              {isAuthenticated && (
                <NavLink icon={<PenSquare size={18} />} text="Write" onClick={() => navigate('/posts/create')} />
              )}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              {!isAuthenticated ? (
                <>
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="flex items-center space-x-2 px-4 py-2 text-blue-300 hover:text-blue-200 transition-colors"
                  >
                    <LogIn size={18} />
                    <span>Login</span>
                  </button>
                  <button
                    onClick={() => handleAuthClick('signup')}
                    className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-100 shadow-lg hover:shadow-blue-600/25"
                  >
                    <UserPlus size={18} />
                    <span>Sign Up</span>
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <span className="text-blue-300">Welcome, {user?.name || 'User'}</span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 text-red-300 hover:text-red-200 transition-colors"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
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

// Helper component for nav links
const NavLink = ({ icon, text, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors group"
  >
    <span className="transform group-hover:scale-110 transition-transform">
      {icon}
    </span>
    <span>{text}</span>
  </button>
);

export default Navbar;