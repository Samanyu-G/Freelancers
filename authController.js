const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Registration
exports.register = async (req, res) => {
    try {
        const { name, email, password, role, skills } = req.body;
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Email already exists' });

        const user = new User({ name, email, password, role, skills });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const user = await User.findOne({ email, role });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { name: user.name, email: user.email, role: user.role, skills: user.skills } });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};