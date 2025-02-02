const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";  // Use dotenv for security

// **Signup User**
exports.signup = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        console.log(req.body)
        // Check if user already exists by email or username
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email or username already exists" });
        }

        // Hash the password before saving
        // const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            username,
            email,
            password
        });

        // Save the new user to the database
        await newUser.save();

        // Respond with success message
        res.status(201).json({ message: `${name} You are registered successfully` });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// **Login User**
exports.login = async (req, res) => {
    try {
        console.log(req.body)
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Password" });

        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({
            message: "Login successful",
            token,
            user: { name: user.name, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
