const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    author: {
        name: { type: String, required: true },
        username: { type: String, required: true },  // Ensuring username is unique
        avatar: { type: String, required: true },  // Placeholder URL for avatar
    },
    category: { type: String, required: true },
    publishedAt: { type: Date, required: true },
    readTime: { type: Number, required: true },
    tags: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
}
);

module.exports = mongoose.model("Post", postSchema);
