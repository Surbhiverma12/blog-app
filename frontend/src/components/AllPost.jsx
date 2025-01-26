import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  PenTool, 
  BookOpen, 
  Plus, 
  User, 
  Clock, 
  Tag, 
  Filter 
} from 'lucide-react';

// Sample blog post data with more details
const initialPosts = [
  {
    id: 1,
    title: "Revolutionizing Web Development",
    excerpt: "A deep dive into cutting-edge technologies transforming modern web applications...",
    content: "",
    author: {
      name: "Elena Rodriguez",
      username: "technovator",
      avatar: "/api/placeholder/50/50"
    },
    category: "Technology",
    publishedAt: "2024-01-22T14:30:00Z",
    readTime: 7,
    tags: ["React", "Web Dev", "Innovation"]
  },
  {
    id: 2,
    title: "Design Thinking in User Experience",
    excerpt: "Exploring human-centered design principles that create intuitive interfaces...",
    content: "",
    author: {
      name: "Marcus Wong",
      username: "uxmaster",
      avatar: "/api/placeholder/50/50"
    },
    category: "Design",
    publishedAt: "2024-01-18T10:15:00Z",
    readTime: 6,
    tags: ["UX", "Design", "Product"]
  }
];



const AllPost = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    excerpt: "",
    category: "",
    tags: ""
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/posts');
        setPosts(res.data);
        console.log(res.data)
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchPosts();
  }, []);

  const handleCreatePost = () => {
    const post = {
      id: posts.length + 1,
      ...newPost,
      author: {
        name: "Current User",
        username: "blogger",
        avatar: "/api/placeholder/50/50"
      },
      publishedAt: new Date().toISOString(),
      readTime: Math.ceil(newPost.excerpt.split(' ').length / 200)
    };
    setPosts([post, ...posts]);
    setIsCreatingPost(false);
    setNewPost({ title: "", excerpt: "", category: "", tags: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-950 text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header with Create Post Button */}
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-blue-300 mb-2">Explore Insights</h1>
            <p className="text-gray-400">Discover, Learn, and Share Knowledge</p>
          </div>
          <button 
            onClick={() => setIsCreatingPost(!isCreatingPost)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Create Post</span>
          </button>
        </header>

        {/* Blog Post Creation Section */}
        {isCreatingPost && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-xl">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <PenTool className="mr-3 text-blue-400" /> Create New Post
            </h2>
            <div className="grid gap-4">
              <input 
                placeholder="Post Title" 
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                className="w-full bg-gray-700 text-white p-3 rounded-md"
              />
              <textarea 
                placeholder="Write your post excerpt..." 
                value={newPost.excerpt}
                onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                className="w-full bg-gray-700 text-white p-3 rounded-md h-32"
              />
              <div className="flex space-x-4">
                <input 
                  placeholder="Category" 
                  value={newPost.category}
                  onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                  className="flex-1 bg-gray-700 text-white p-3 rounded-md"
                />
                <input 
                  placeholder="Tags (comma separated)" 
                  value={newPost.tags}
                  onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                  className="flex-1 bg-gray-700 text-white p-3 rounded-md"
                />
              </div>
              <button 
                onClick={handleCreatePost}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Publish Post
              </button>
            </div>
          </div>
        )}

        {/* Filtering and Sorting */}
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

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map(post => (
            <div 
              key={post.id} 
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-all hover:scale-[1.03] hover:shadow-2xl"
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
                
                <div className="mt-4 flex space-x-2">
                {post.tags && Array.isArray(post.tags) && post.tags.length > 0 ? (
  post.tags.map((tag, index) => (
    <span 
      key={index} // Use index if tags are not unique
      className="bg-blue-900 text-blue-300 px-2 py-1 rounded-full text-xs"
    >
      {tag}
    </span>
  ))
) : (
  <span>No tags available</span> // Fallback message if no tags exist
)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
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