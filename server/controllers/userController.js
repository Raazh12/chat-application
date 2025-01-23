// server/controllers/userController.js

const User = require('../models/User');

// Register a new user
const registerUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Login a user
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    // Implement authentication logic here
    res.status(200).json({ message: 'Login successful' });
};

module.exports = { registerUser, loginUser };