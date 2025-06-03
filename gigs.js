// routes/gigs.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../Middleware/auth');
const { createGig, getAllGigs } = require('../Controllers/gigController');

// POST /api/gigs - create a gig (freelancers only)
router.post('/', authenticateToken, createGig);

// GET /api/gigs - list all gigs
router.get('/', getAllGigs);

module.exports = router;