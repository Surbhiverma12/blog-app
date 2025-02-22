const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;  

// **Signup User**
exports.signup = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({success:false, message: "User with this email or username already exists" });
        }

        const newUser = new User({
            name,
            username,
            email,
            password
        });

        const user = await newUser.save();
        console.log(user)

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "15m" });

        res.status(200).json({ 
            success: true,
            message: `You are registered successfully`, 
            token,
            user: {name: name,
            username: username},
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error", error: error.message 
        });
    }
};

// **Login User**
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Password" });

        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "15m" });

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: { name: user.name, email: user.email }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error", error: error.message 
            });
    }
};
