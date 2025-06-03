// controllers/gigController.js
const Gig = require('../models/Gig');

exports.createGig = async (req, res) => {
  try {
    // Only freelancers can post gigs
    if (req.user.role !== 'freelancer') {
      return res.status(403).json({ message: 'Only freelancers can post gigs' });
    }

    const { title, description, skills, price } = req.body;
    if (!title || !description || !price) {
      return res.status(400).json({ message: 'Title, description, and price are required' });
    }

    const gig = new Gig({
      title,
      description,
      skills,
      price,
      postedBy: req.user._id
    });

    await gig.save();
    res.status(201).json({ message: 'Gig posted successfully', gig });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllGigs = async (req, res) => {
  try {
    const gigs = await Gig.find().populate('postedBy', 'name email');
    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};