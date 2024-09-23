const express = require('express');
const { createUser, loginUser } = require('../controllers/user');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

// Create a new user without requiring a token
router.post('/users', createUser);

// Log in a user, requiring a token verification
router.post('/users/login', loginUser);

module.exports = router;
