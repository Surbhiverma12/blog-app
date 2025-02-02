const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require('../controllers/postcontrollers.js')

// Create a new post
router.post("/", authMiddleware, createPost);

// Get all posts
router.get("/", getAllPosts);

// Get a single post by ID
router.get("/:id", getPostById);

// Update a post by ID
router.put("/:id", updatePost);

// Delete a post by ID
router.delete("/:id", deletePost);

module.exports = router;
