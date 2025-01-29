import React from 'react';
import { ArrowRight, Notebook, Pen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BlogHeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white">
      {/* Hero Content */}
      <div className="container mx-auto px-4 min-h-screen flex items-center pt-10">
        <div className="grid md:grid-cols-2 gap-12 items-center py-12">
          {/* Text Content */}
          <div className="space-y-8 relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-400">
                Discover.
              </span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500">
                Write.
              </span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                Share.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-blue-200 opacity-90 max-w-xl leading-relaxed">
              Your platform for meaningful conversations and insights from writers around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:space-x-4 pt-4">
              <button
                onClick={() => navigate('/posts')}
                className="group bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-lg hover:shadow-blue-600/25"
              >
                Start Reading
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <button
                onClick={() => navigate('/explore')}
                className="group bg-transparent border-2 border-blue-500 text-blue-300 px-8 py-4 rounded-xl hover:bg-blue-800/30 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                Explore Topics
              </button>
            </div>
          </div>

          {/* Side Notebook/Writing Icon */}
          <div className="hidden md:flex justify-center items-center relative z-10">
            <div 
              onClick={() => navigate('/posts/create')}
            className="relative bg-gradient-to-br from-blue-800/80 to-blue-900/80 rounded-2xl p-12 shadow-2xl backdrop-blur-sm hover:scale-105 transition-transform duration-300 border border-blue-700/30">
              <div className="absolute inset-0 bg-blue-600/10 rounded-2xl backdrop-blur-sm"></div>
              <Notebook
                size={250}
                className="text-blue-200 relative z-10"
                strokeWidth={1.5}
              />
              <div className="absolute bottom-10 right-10 animate-pulse">
                <Pen
                  size={100}
                  className="text-blue-300/80 transform -rotate-45"
                  strokeWidth={1.5}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/30 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/30 rounded-full opacity-30 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-blue-400/20 rounded-full opacity-20 blur-3xl animate-pulse delay-700"></div>
        <div className="absolute -bottom-20 right-1/4 w-64 h-64 bg-blue-700/20 rounded-full opacity-20 blur-3xl"></div>
      </div>
    </div>
  );
};

export default BlogHeroSection;