// server/routes/messageRoutes.js

const express = require('express');
const { sendMessage, getMessages } = require('../controllers/messageController');
const authMiddleware = require('../middleware/authMiddleware'); // Import middleware
const router = express.Router();

router.post('/', authMiddleware, sendMessage); // Protect this route
router.get('/:user1/:user2', authMiddleware, getMessages); // Protect this route

module.exports = router;