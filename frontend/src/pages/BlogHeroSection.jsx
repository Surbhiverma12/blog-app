import React, { useState } from 'react';
import { ArrowRight, Notebook, Pen } from 'lucide-react';
import AuthModal from './AuthModal';

const BlogHeroSection = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState('login');

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white flex flex-col">
      {/* Navigation */}
      <nav className={`fixed w-full bg-gray-900 bg-opacity-80 backdrop-blur-md z-40 
        ${isAuthModalOpen ? 'filter blur-sm' : ''}`}>
        <div className="container mx-auto flex justify-between items-center px-4 py-4">
          {/* Logo */}
          <div className="text-2xl font-bold text-blue-100">
            BlogSpot
          </div>

          {/* Authentication Buttons */}
          <div className="flex space-x-4">
            <button 
              onClick={() => {
                setAuthType('login');
                setIsAuthModalOpen(true);
              }}
              className="bg-transparent border border-blue-500 text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors"
            >
              Login
            </button>
            <button 
              onClick={() => {
                setAuthType('signup');
                setIsAuthModalOpen(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className={`container mx-auto px-4 flex-grow flex items-center pt-20 
        ${isAuthModalOpen ? 'filter blur-lg' : ''}`}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-blue-100 leading-tight">
              Discover. Write. Share.
            </h1>
            <p className="text-xl text-blue-300 opacity-80">
              Your platform for meaningful conversations and insights from writers around the world.
            </p>
            <div className="flex space-x-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                Start Reading
                <ArrowRight className="ml-2" size={20} />
              </button>
              <button className="bg-transparent border-2 border-blue-500 text-blue-300 px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors">
                Explore Topics
              </button>
            </div>
          </div>

          {/* Side Notebook/Writing Icon */}
          <div className="hidden md:flex justify-center items-center">
            <div className="bg-blue-800 rounded-2xl p-12 shadow-2xl hover:scale-105 transition-transform">
              <Notebook 
                size={250} 
                className="text-blue-300 opacity-80"
                strokeWidth={1.5}
              />
              <div className="absolute bottom-10 right-10">
                <Pen 
                  size={100} 
                  className="text-blue-200 opacity-60 transform -rotate-45"
                  strokeWidth={1.5}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className={`absolute inset-0 overflow-hidden pointer-events-none 
        ${isAuthModalOpen ? 'filter blur-lg' : ''}`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-700 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-600 rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Auth Modal - Positioned absolutely to be on top */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50">
          <AuthModal 
            isOpen={isAuthModalOpen} 
            onClose={() => setIsAuthModalOpen(false)}
            type={authType}
          />
        </div>
      )}
    </div>
  );
};

export default BlogHeroSection;