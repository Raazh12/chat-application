// controllers/messageController.js

const Message = require('../models/Message');

// Send a message
exports.sendMessage = async (req, res) => {
    const { senderId, receiverId, content } = req.body;

    console.log('Sender ID:', senderId);
    console.log('Receiver ID:', receiverId);
    console.log('Content:', content);
    
    try {
        const newMessage = new Message({ sender: senderId, recipient: receiverId, content });
        await newMessage.save();
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending message:', error); // Log the error for debugging
        res.status(500).json({ error: 'Failed to send message' });
    }
};

// Get messages between two users
exports.getMessages = async (req, res) => {
    const { user1, user2 } = req.params;
    try {
        const messages = await Message.find({
            $or: [
                { sender: user1, recipient: user2 },
                { sender: user2, recipient: user1 }
            ]
        }).populate('sender recipient');
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve messages' });
    }
};