const express = require("express");
const router = express.Router();
const { getReviews, addReview, deleteReview } = require('../controllers/reviewController.js');
const { authMiddleware } = require('../middleware/authMiddleware.js');

router.get('/posts/:postId/reviews', getReviews);
router.post('/posts/:postId/reviews',authMiddleware, addReview);
router.delete("/posts/:postId/reviews/:reviewId",authMiddleware, deleteReview);

module.exports = router;

