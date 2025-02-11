import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Star, Trash2, Send, User, Clock } from 'lucide-react';

const Review = ({ postId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_MAP_API_URL}/api/posts/${postId}/reviews`
        );
        setReviews(response.data);
      } catch (error) {
        toast.error('Failed to load reviews');
      }
    };

    fetchReviews();
  }, [postId, newReview]);

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (newReview.rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_MAP_API_URL}/api/posts/${postId}/reviews`,
        newReview,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReviews([response.data, ...reviews]);
      setNewReview({ rating: 0, comment: '' });
      toast.success('Review added successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add review');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_MAP_API_URL}/api/posts/${postId}/reviews/${reviewId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setReviews(reviews.filter(review => review._id !== reviewId));
        toast.success('Review deleted successfully');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete review');
      }
    }
  };

  const StarRating = ({ rating, setRating, readonly = false }) => {
    const [hoverRating, setHoverRating] = useState(0);

    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 transition-transform duration-200 ${
              star <= (hoverRating || rating)
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-400'
            } ${
              !readonly && 
              'cursor-pointer hover:scale-110'
            }`}
            onMouseEnter={() => !readonly && setHoverRating(star)}
            onMouseLeave={() => !readonly && setHoverRating(0)}
            onClick={() => !readonly && setRating(star)}
          />
        ))}
      </div>
    );
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="mt-8">
      <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="px-6 py-4 bg-gray-900/50 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-blue-400">Reviews</h2>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-400">{reviews.length} reviews</div>
              <div className="flex items-center bg-gray-800 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                <span className="font-semibold text-white">{getAverageRating()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Add Review Form */}
          <form onSubmit={handleAddReview} className="bg-gray-900/30 rounded-lg p-4 backdrop-blur-sm">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Rating
                </label>
                <StarRating 
                  rating={newReview.rating} 
                  setRating={(rating) => setNewReview(prev => ({ ...prev, rating }))} 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Review
                </label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  className="w-full bg-gray-800 text-white rounded-lg p-3 border border-gray-700 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all 
                           duration-200 outline-none resize-none"
                  rows="3"
                  placeholder="Share your thoughts about this post..."
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center space-x-2 w-full sm:w-auto px-4 py-2 
                         bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed
                         rounded-lg font-medium text-white transition-colors duration-200"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    <span>Submitting...</span>
                  </div>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Submit Review</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Reviews List */}
          {reviews.length === 0 ? (
            <div className="text-center py-8">
              <div className="inline-block p-3 bg-gray-800 rounded-full mb-4">
                <Star className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-400">No reviews yet. Be the first to share your thoughts!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div 
                  key={review._id} 
                  className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-800 transition-colors duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="bg-gray-700 p-2 rounded-full">
                        <User size={20} className="text-gray-300" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-gray-200">{review.author.name}</h3>
                          <span className="text-gray-500">•</span>
                          <div className="flex items-center text-gray-400 text-sm">
                            <Clock size={12} className="mr-1" />
                            {formatDate(review.createdAt)}
                          </div>
                        </div>
                        <div className="mt-1">
                          <StarRating rating={review.rating} readonly />
                        </div>
                        <p className="mt-2 text-gray-300">{review.comment}</p>
                      </div>
                    </div>

                    {user.name === review.author.name && (
                      <button
                        onClick={() => handleDeleteReview(review._id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 
                                 rounded-lg transition-colors duration-200"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;