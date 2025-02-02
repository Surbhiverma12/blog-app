const Post = require("../models/post.js");

// Create a post
exports.createPost = async (req, res) => {
    try {
        const { title, excerpt, content, category, publishedAt, readTime, tags } = req.body;

        if (!req.user) return res.status(401).json({ message: "Unauthorized" });

        const newPost = new Post({
            title,
            excerpt,
            content,
            author: req.user._id,  // Save logged-in user as the author
            category,
            publishedAt,
            readTime,
            tags
        });

        await newPost.save();
        res.status(201).json({ message: "Post created successfully", post: newPost });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        console.log(posts)
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getPostById =  async (req, res) => {
    try {
        console.log("get called")
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body,
      { new: true }
    );
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};