// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    console.log('Incoming Request Headers:', req.headers);
    
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Access denied.');

    // Split the token to remove 'Bearer ' prefix
    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send('Invalid token.');
        req.user = user;
        next();
    });
};

module.exports = authMiddleware;