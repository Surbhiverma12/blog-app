import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PenTool, BookOpen, Plus, Filter, Tag, User, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import Loader from './Loader';

const AllPost = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchPosts = async () => {
      try {

        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_MAP_API_URL}/api/posts`);
        setPosts(res.data);
        console.log(res.data)

      } 
      catch (err) {
        console.error('Error fetching posts:', err);
    } 
    finally {
      setLoading(false);
    }
    };
    fetchPosts();
  }, []);

  const handleCardClick = (post) => {
    navigate(`/posts/${post._id}`);
  };

  
  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-950 text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-blue-300 mb-2">Explore Insights</h1>
            <p className="text-gray-400">Discover, Learn, and Share Knowledge</p>
          </div>
          <button 
            onClick={() => navigate('/posts/create')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Create Post</span>
          </button>
        </header>

        {/* Filter Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <button className="bg-gray-800 hover:bg-blue-800 px-4 py-2 rounded-lg flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <button className="bg-gray-800 hover:bg-blue-800 px-4 py-2 rounded-lg flex items-center space-x-2">
              <Tag className="w-4 h-4" />
              <span>Categories</span>
            </button>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map(post => (
            <div 
              key={post._id}
              onClick={() => handleCardClick(post)}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-all hover:scale-[1.03] hover:shadow-2xl cursor-pointer"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-blue-300 mb-3">{post.title}</h2>
                <p className="text-gray-400 mb-4">{post.excerpt}</p>
                
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{post.author.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime} min read</span>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {Array.isArray(post.tags) && post.tags.map((tag, index) => (
                    <span 
                      key={`${post.id}-${index}`}
                      className="bg-blue-900 text-blue-300 px-2 py-1 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

         <div className="text-center mt-8">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg flex items-center space-x-2 mx-auto">
            <BookOpen className="w-5 h-5" />
            <span>Load More Posts</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllPost;