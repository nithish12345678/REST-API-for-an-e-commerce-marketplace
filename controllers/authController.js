const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.register = async (req, res) => {
    try {
        const { username, password, userType } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already taken' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = new User({
            username,
            password: hashedPassword,
            userType,
        });

        await newUser.save();

        const userWithoutPassword = {
            _id: newUser._id,
            username: newUser.username,
            userType: newUser.userType,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt
        };

        res.json({ message: 'Registration successful', user: userWithoutPassword });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;


        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }


        const token = jwt.sign({ userId: user._id, userType: user.userType }, process.env.jwtSecret)
        const userWithoutPassword = {
            _id: user._id,
            username: user.username,
            userType: user.userType,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };

        res.json({ token, user: userWithoutPassword });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};