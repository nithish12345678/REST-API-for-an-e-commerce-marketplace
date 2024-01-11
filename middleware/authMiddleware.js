const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.jwtSecret);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized - Invalid token' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
};

module.exports = authMiddleware;
