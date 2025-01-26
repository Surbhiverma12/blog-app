const express = require("express");
const Post = require("../models/Post");
const router = express.Router();

// Create a new post
router.post("/", async (req, res) => {
    const author = {
    name: "Surabhi Verma",  // You can change this as needed
    username: "technovator",  // Constant username
    avatar: "/api/placeholder/50/50"  // Constant avatar URL
    };
    try {
        const newPost = new Post({
          title,
          excerpt,
          content,
          author,  // Using the hardcoded author object
          category,
          publishedAt,
          readTime,
          tags
      });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single post by ID
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a post by ID
router.put("/:id", async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
          title,
          excerpt,
          content,
          category,
          publishedAt,
          readTime,
          tags
      },
      { new: true }
    yredwqz);
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a post by ID
router.delete("/:id", async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
