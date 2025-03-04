import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, User, Clock, Edit, Trash2, Calendar, Folder, Eye, ThumbsUp } from "lucide-react";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import Review from '../components/Review';

const ViewPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewCount, setViewCount] = useState(0);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_MAP_API_URL}/api/posts/${id}`
        );
        setPost(response.data);
        setViewCount(response.data.views || 0);
      } catch (error) {
        toast.error("Failed to load post");
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_MAP_API_URL}/api/posts/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Blog post deleted successfully");
        navigate("/posts");
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete post");
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) return <Loader />;
  if (!post) return <div>Post not found</div>;

  const isAuthor = user.name === post.author.name;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-950 text-white py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate("/posts")}
            className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Posts</span>
          </button>

          {isAuthor && (
            <div className="flex space-x-4">
              <Link
                to={`/edit-post/${id}`}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
              >
                <Edit size={16} />
                <span>Edit Post</span>
              </Link>
              <button
                onClick={handleDelete}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200"
              >
                <Trash2 size={16} />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>

        <article className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-4xl font-bold text-blue-300 mb-6 leading-tight">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
              <div className="flex items-center space-x-2">
                <div className="bg-gray-700 p-2 rounded-full">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-gray-300">{post.author.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.createdAt)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} min read</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>{post.views} views</span>
              </div>
              <div className="flex items-center space-x-2">
                <Folder className="w-4 h-4" />
                <span>{post.category || "Uncategorized"}</span>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 mb-8 backdrop-blur-sm border border-gray-700/50">
              <p className="text-lg text-gray-300 italic">{post.excerpt}</p>
            </div>

            <div className="prose prose-invert max-w-none">
              {post.content.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-200 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-700">
                <h2 className="text-sm uppercase text-gray-400 mb-3">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm hover:bg-blue-600/30 transition-colors duration-200 cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        <div className="mt-12">
          <Review postId={id} />
        </div>
      </div>
    </div>
  );
};

export default ViewPost;