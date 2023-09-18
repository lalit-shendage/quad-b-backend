const express = require('express');
const router = express.Router();


// Import route files
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');

// Use the route files
router.use('/auth', authRoutes);
router.use('/', userRoutes);

module.exports = router;
