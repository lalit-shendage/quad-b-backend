const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/auth');

// Middleware to authenticate requests using JWT
exports.authenticateMiddleware = (req, res, next) => {
  // Get the token from the request header
  const token = req.header('Authorization');

  // Check if the token is missing
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, jwtSecret);

    // Attach the decoded user information to the request object
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
};
