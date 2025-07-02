import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // ✅ Add this
import AuthModal from './AuthModal';              // ✅ Import modal
import {
  PenTool, BookOpen, Plus, Filter, Tag, User,
  Clock, Eye, MessageCircle, Calendar, Search
} from 'lucide-react';
import Loader from './Loader';

const AllPost = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // ✅ access user
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(4);

  // ✅ Modal state
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState('signup');

  const categories = ['All', 'Technology', 'Design', 'Development', 'Coding', 'Lifestyle'];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_MAP_API_URL}/api/posts`);
        setPosts(res.data);
      } catch (err) {
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleCardClick = (post) => {
    navigate(`/posts/${post._id}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const filteredPosts = sortedPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory.toLowerCase() === 'all' || 
                            post.category?.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });
  const visiblePosts = filteredPosts.slice(0, visibleCount);

  const handleCreateClick = () => {
    if (user) {
      navigate('/posts/create');
    } else {
      setAuthType('signup'); // or 'login'
      setAuthModalOpen(true);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-950 text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">

        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-blue-300 mb-2">Explore Insights</h1>
            <p className="text-gray-400">Discover, Learn, and Share Knowledge</p>
          </div>
          <button 
            onClick={handleCreateClick}
            className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-200 hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Create Post</span>
          </button>
        </header>

        {/* Search and Filter */}
        <div className="bg-gray-800/50 rounded-xl p-4 mb-8 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category.toLowerCase())}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === category.toLowerCase()
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {visiblePosts.map(post => (
            <div 
              key={post._id}
              onClick={() => handleCardClick(post)}
              className="bg-gray-800/80 rounded-xl overflow-hidden shadow-lg transform transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl cursor-pointer border border-gray-700/50"
            >
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="bg-gray-700 p-2 rounded-full">
                    <User className="w-4 h-4 text-blue-300" />
                  </div>
                  <span className="text-gray-300">{post.author.name}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-400 text-sm">{formatDate(post.createdAt)}</span>
                </div>

                <h2 className="text-2xl font-bold text-blue-300 mb-3 line-clamp-2">{post.title}</h2>
                <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {Array.isArray(post.tags) && post.tags.map((tag, index) => (
                    <span 
                      key={`${post._id}-${index}`}
                      className="bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400 border-t border-gray-700 pt-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime} min read</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{post.views || 0} views</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.reviewCount || 0} reviews</span>
                    </div>
                  </div>
                  {post.category && (
                    <span className="bg-gray-700 px-2 py-1 rounded-lg text-xs">
                      {post.category}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No posts found matching your criteria</p>
          </div>
        )}

        {/* Load More Button */}
        {visibleCount < filteredPosts.length && (
          <div className="text-center mt-8">
            <button
              onClick={() => setVisibleCount(prev => prev + 4)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg flex items-center space-x-2 mx-auto transition-all duration-200 hover:shadow-lg"
            >
              <BookOpen className="w-5 h-5" />
              <span>Load More Posts</span>
            </button>
          </div>
        )}
       {isAuthModalOpen && (
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setAuthModalOpen(false)} 
            type={authType}
          />
        )}
      </div>
    </div>
  );
};

export default AllPost;
