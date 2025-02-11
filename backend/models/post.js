const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
    publishedAt: { type: Date, required: true },
    readTime: { type: Number, required: true },
    tags: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    views: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
}
);

module.exports = mongoose.model("Post", postSchema);
