import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, User, Clock, Edit, Trash2 } from 'lucide-react';

const ViewPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://blog-app-api-c2yw.onrender.com/api/posts/${id}`);
        setPost(response.data);
        setEditedPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  const handleEdit = async () => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_MAP_API_URL}/api/posts/${id}`, editedPost);
      setPost(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_MAP_API_URL}/api/posts/${id}`);
        navigate('/posts');
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  if (!post) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-890 to-blue-950 text-white py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <button 
          onClick={() => navigate('/posts')}
          className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Posts</span>
        </button>

        <div className="bg-gray-800 rounded-lg p-8 shadow-xl">
          {isEditing ? (
            <div className="space-y-6">
              <input
                className="w-full bg-gray-700 text-white p-3 rounded-md text-3xl font-bold"
                value={editedPost.title}
                onChange={(e) => setEditedPost({...editedPost, title: e.target.value})}
              />
              <textarea
                className="w-full bg-gray-700 text-white p-3 rounded-md h-24"
                value={editedPost.excerpt}
                onChange={(e) => setEditedPost({...editedPost, excerpt: e.target.value})}
              />
              <textarea
                className="w-full bg-gray-700 text-white p-3 rounded-md h-64"
                value={editedPost.content}
                onChange={(e) => setEditedPost({...editedPost, content: e.target.value})}
              />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 rounded-lg text-gray-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEdit}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-3xl font-bold text-blue-300">{post.title}</h1>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="p-2 text-blue-400 hover:bg-blue-900 rounded-full"
                  >
                    <Edit size={20} />
                  </button>
                  <button 
                    onClick={handleDelete}
                    className="p-2 text-red-400 hover:bg-red-900 rounded-full"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-gray-400 mb-6">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{post.author.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>

              <p className="text-gray-400 mb-8">{post.excerpt}</p>
              
              <div className="prose prose-invert max-w-none">
                {post.content}
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {Array.isArray(post.tags) && post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-900 text-blue-300 px-2 py-1 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewPost