const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require('../controllers/postcontrollers.js')

// Create a new post
router.post("/", authMiddleware, createPost);

// Get all posts
router.get("/", getAllPosts);

// Get a single post
router.get("/:id", getPostById);

// Update a post 
router.put("/:id", authMiddleware, updatePost);

// Delete a post 
router.delete("/:id", authMiddleware, deletePost);

module.exports = router;
