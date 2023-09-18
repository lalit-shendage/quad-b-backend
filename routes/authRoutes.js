const express = require('express');
const router = express.Router();
const { authenticateMiddleware } = require('../middleware/authentication');
const { login, register } = require('../controllers/authController');

// POST /auth/login - Login user
router.post('/login', login);

// POST /auth/register - Register a new user
router.post('/register', register);

module.exports = router;
