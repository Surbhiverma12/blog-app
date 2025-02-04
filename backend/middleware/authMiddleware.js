const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

exports.authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) return res.status(401).json({ message: "Unauthorized: No token" });

        const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        if (!req.user) return res.status(401).json({ message: "User not found" });

        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid", error: error.message });
    }
};
