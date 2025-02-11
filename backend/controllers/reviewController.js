const Review = require('../models/Review.js');
const Post = require("../models/post.js");

// Get all reviews for a post
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ postId: req.params.postId }).populate('author', 'name');
    console.log(reviews)
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
}

// Add a new review
exports.addReview = async (req, res) => {
  const { rating, comment } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }

  try {
    const post = await Post.findById(req.params.postId);
    console.log(post)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    console.log(req.params.postId)
    console.log(req.user)

    const review = new Review({
      postId: req.params.postId,
      author: req.user._id,
      rating,
      comment,
    });
    console.log(review)

    await review.save();
    await Post.findByIdAndUpdate(req.params.postId, { $inc: { reviewCount: 1 } }, { new: true });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error adding review' });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;

    const review = await Review.findById(reviewId);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found"
    });
    }

    if (review.author.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this post" 
    });
    }

    const deletedReview = await Review.findByIdAndDelete(reviewId);

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId, 
      { $inc: { reviewCount: -1 } }, 
      { new: true } 
  );

  console.log("Updated Post:", updatedPost); 
    
    res.status(200).json({ 
        success: true,
            message: "Review deleted successfully" 
        });
  } 
  catch (error) {
    res.status(500).json({ message: 'Error deleting review' });
  }
};
