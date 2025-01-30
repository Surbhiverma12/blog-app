import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { ArrowLeft } from 'lucide-react';
import { ArrowLeft, Pencil, Hash, Book, FileText, Layout } from 'lucide-react';

const CreatePost = () => {
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState({
    title: "",
    excerpt: "",
    content: "", // Added content field
    category: "",
    tags: []
  });

  const handleCreatePost = async () => {
    // Your existing create post logic
    const wordCount = newPost.content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    const tagsArray = Array.isArray(newPost.tags) 
      ? newPost.tags 
      : newPost.tags.split(',').map(tag => tag.trim());

    const post = {
      ...newPost,
      tags: tagsArray,
      author: {
        name: "Current User",
        username: "blogger",
        avatar: "/api/placeholder/50/50"
      },
      publishedAt: new Date().toISOString(),
      readTime: readTime
    };

    try {
      console.log(post)
      const response = await axios.post('https://blog-app-api-c2yw.onrender.com/api/posts', post);
      navigate('/posts');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };
{/* <div className="min-h-screen bg-gradient-to-br from-gray-800 via-blue-900 to-gray-900"></div> */}
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
          <h1 className="text-3xl font-bold mb-8 text-blue-300">Create New Post</h1>
          
          <div className="space-y-6">
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-400 mb-2">
                <Layout className="w-4 h-4" />
                <span>Title</span>
              </label>
              <input 
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                className="w-full bg-gray-700 text-white p-4 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter post title..."
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-400 mb-2">
                <FileText className="w-4 h-4" />
                <span>Excerpt</span>
              </label>
              <textarea 
                value={newPost.excerpt}
                onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                className="w-full bg-gray-700 text-white p-4 rounded-lg h-32 focus:ring-2 focus:ring-blue-500"
                placeholder="Write a brief summary..."
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-400 mb-2">
                <Book className="w-4 h-4" />
                <span>Content</span>
              </label>              
              <textarea 
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                className="w-full bg-gray-700 text-white p-4 rounded-lg h-64 focus:ring-2 focus:ring-blue-500"
                placeholder="Write your post content..."
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-400 mb-2">
              <Layout className="w-4 h-4" />
              <span>Category</span>
              </label>                
                <input 
                  value={newPost.category}
                  onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                  className="w-full bg-gray-700 text-white p-4 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Technology"
                />
              </div>
              <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-400 mb-2">
                <Hash className="w-4 h-4" />
                <span>Tags</span>
              </label>
                <input 
                  value={typeof newPost.tags === 'string' ? newPost.tags : newPost.tags.join(', ')}
                  onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                  className="w-full bg-gray-700 text-white p-4 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Separate tags with commas"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button
                onClick={() => navigate('/posts')}
                className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePost}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors"
              >
                Publish Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;