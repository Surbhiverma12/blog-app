const Post = require("../models/post.js");

// Create a post
exports.createPost = async (req, res) => {
    try {
        const { title, excerpt, content, category, publishedAt, readTime, tags } = req.body;

        console.log(req.body)
        if (!req.user) return res.status(401).json({
            success: false,
            message: "Unauthorized" 
            });

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

        res.status(201).json({ 
            success: true,
            message: "Post created successfully", 
            post: newPost, 
        });

    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Server error", 
            error, 
        });
    }
};

exports.getAllPosts = async (req, res) => {
    try {

        const posts = await Post.find().populate("author", "username name");;
        res.status(200).json(posts);

    } catch (err) {
        res.status(500).json({ 
            success: false,
            message: "Server error", 
            err, 
        });
    }
}

exports.getPostById =  async (req, res) => {
    try {

        const post = await Post.findById(req.params.id).populate("author", "username name");

        if (!post) return res.status(404).json({
            success: true,
            message: "Post not found"
        });

        res.status(200).json(post);

    } catch (err) {
        res.status(500).json({ 
            success: false,
            message: "Server error", 
            err, 
        });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user.id;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
          }
      
          if (post.author.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized to edit this post" 
            });
          }
      
          const updatedPost = await Post.findByIdAndUpdate(postId, req.body, {
            new: true,
          }).populate("author", "username name");

        res.status(200).json(updatedPost);

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error", 
            err,
        });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user.id;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
          }
      
          if (post.author.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized to delete this post" 
            });
          }
      
        await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({ 
            success: true,
            message: "Post deleted successfully" 
        });

    } catch (err) {
        res.status(500).json({ 
            success: false,
            message: "Server error",
            err,
        });
    }
};