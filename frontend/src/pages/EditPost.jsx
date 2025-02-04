import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [post, setPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: []
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_MAP_API_URL}/api/posts/${id}`);
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to load post', { position: "top-right" });
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      const response = await axios.put(
        `${import.meta.env.VITE_MAP_API_URL}/api/posts/${id}`,
        post,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      toast.success("Blog post updated successfully", { position: "top-right" });
      navigate(`/posts/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update post', { position: "top-right" });
    } finally {
      setSaving(false);
    }
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setPost({ ...post, tags });
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-950 text-white py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={() => navigate(`/post/${id}`)}
            className="flex items-center space-x-2 text-blue-400 hover:text-blue-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Post</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-8 shadow-xl space-y-6">
          <h1 className="text-2xl font-bold text-blue-300 mb-8">Edit Blog Post</h1>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                value={post.title}
                onChange={(e) => setPost({...post, title: e.target.value})}
                className="w-full bg-gray-700 text-white p-3 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Excerpt
              </label>
              <textarea
                value={post.excerpt}
                onChange={(e) => setPost({...post, excerpt: e.target.value})}
                className="w-full bg-gray-700 text-white p-3 rounded-md h-24"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Content
              </label>
              <textarea
                value={post.content}
                onChange={(e) => setPost({...post, content: e.target.value})}
                className="w-full bg-gray-700 text-white p-3 rounded-md h-64"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={post.tags.join(', ')}
                onChange={handleTagsChange}
                className="w-full bg-gray-700 text-white p-3 rounded-md"
                placeholder="e.g. technology, programming, web development"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={() => navigate(`/post/${id}`)}
              className="px-6 py-3 rounded-lg text-gray-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg disabled:opacity-50"
            >
              <Save size={20} />
              <span>{saving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;