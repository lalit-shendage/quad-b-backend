const express = require('express');
const router = express.Router();
const { authenticateMiddleware } = require('../middleware/authentication');
const {
  getUserDetails,
  updateUserDetails,
  getImage,
  insertUser,
  deleteUser,
} = require('../controllers/userController');

// GET /user/details/:id - Fetch user details by id
router.get('/details/:id', authenticateMiddleware, getUserDetails);

// PUT /user/update - Update user details
router.put('/update', authenticateMiddleware, updateUserDetails);

// GET /user/image/:id - Get user image by id
router.get('/image/:id', authenticateMiddleware, getImage);

// POST /user/insert - Insert a new user into the database
router.post('/insert', authenticateMiddleware, insertUser);

// DELETE /user/delete/:id - Delete a user by id
router.delete('/delete/:id', authenticateMiddleware, deleteUser);

module.exports = router;
