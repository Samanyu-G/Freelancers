const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Registration
router.post('/register', authController.register);

// Login (role supplied in body)
router.post('/login', authController.login);

module.exports = router;