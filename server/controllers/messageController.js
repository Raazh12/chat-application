// server/controllers/messageController.js

const Message = require('../models/Message');

// Send a message
const sendMessage = async (req, res) => {
    const { sender, recipient, content } = req.body;
    try {
        const newMessage = new Message({ sender, recipient, content });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get messages between two users
const getMessages = async (req, res) => {
    const { user1, user2 } = req.params;
    try {
        const messages = await Message.find({
            $or: [
                { sender: user1, recipient: user2 },
                { sender: user2, recipient: user1 }
            ]
        });
        res.status(200).json(messages);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { sendMessage, getMessages };