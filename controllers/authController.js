const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { jwtSecret, jwtExpiration } = require('../config/auth');
const { User } = require('../models');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { user_name, user_email, user_password } = req.body;
    
    // Check if the email is already in use
    const existingUser = await User.findOne({ where: { user_email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(user_password, 10);

    // Create a new user
    const newUser = await User.create({
      user_name,
      user_email,
      user_password: hashedPassword,
    });

    res.status(201).json({ message: 'User registered successfully', user_id: newUser.user_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { user_email, user_password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { user_email } });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify the password
    const passwordMatch = await bcrypt.compare(user_password, user.user_password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ user_id: user.user_id }, jwtSecret, { expiresIn: jwtExpiration });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
