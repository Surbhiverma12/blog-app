import React from 'react';
import { ArrowRight, Notebook, Pen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BlogHeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white flex flex-col">
      {/* Hero Content */}
      <div className="container mx-auto px-4 flex-grow flex items-center pt-20">
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
              <button 
                onClick={() => navigate('/posts')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                Start Reading
                <ArrowRight className="ml-2" size={20} />
              </button>
              <button
                onClick={() => navigate('/explore')}
                className="bg-transparent border-2 border-blue-500 text-blue-300 px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors"
              >
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-700 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-600 rounded-full opacity-20 blur-3xl"></div>
      </div>
    </div>
  );
};

export default BlogHeroSection;