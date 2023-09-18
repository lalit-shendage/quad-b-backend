const { User } = require('../models');
const fs = require('fs');


// Get user details by id
exports.getUserDetails = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userDetails = {
      id: user.id,
      user_name: user.user_name,
      user_email: user.user_email,
      total_orders: user.total_orders,
      created_at: user.created_at,
      last_logged_in: user.last_logged_in,
    };

    res.json(userDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Update user details
exports.updateUserDetails = async (req, res) => {
  const newDetails = req.body;
  
  try {
    const user = await User.findOne({ where: { id: newDetails.id } });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update user details
    user.user_name = newDetails.user_name;
    user.user_email = newDetails.user_email;

    // Check if a new image file path was provided in the request
   
    if (newDetails.user_image) {
      
      // Check if the image file exists
      const fileExists = fs.existsSync(newDetails.user_image);
      
      if (!fileExists) {
        return res.status(400).json({ message: 'Image file not found' });
      }

      // Read the image file as binary data
      const imageBuffer = fs.readFileSync(newDetails.user_image);
      
      // Check for errors while reading the file
      if (!imageBuffer || imageBuffer.length === 0) {
        return res.status(400).json({ message: 'Error reading image file' });
      }

      // Convert the image data to a Base64 string and update the user_image field
      user.user_image = imageBuffer.toString('base64');
      
    }

    user.total_orders = newDetails.total_orders;
    await user.save();
    res.json({ message: 'User details updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete user by id
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getImage = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user has an image
    if (!user.user_image) {
      return res.status(404).json({ message: 'User image not found' });
    }

    // Decode the Base64-encoded image data back to binary
    const imageBuffer = Buffer.from(user.user_image, 'base64');

    // Set the appropriate Content-Type for the response (e.g., image/jpeg, image/png)
    res.setHeader('Content-Type', 'image/jpeg'); 

    // Send the image as a response
    res.end(imageBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Insert a new user into the database
exports.insertUser = async (req, res) => {
  const newUserDetails = req.body;
  try {
    // Check if the user with the same email already exists
    const existingUser = await User.findOne({ where: { user_email: newUserDetails.user_email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    // Check if a new image file path was provided in the request
    let userImageBase64 = null;
    if (newUserDetails.user_image_path) {
      // Read the image file as binary data
      const imageBuffer = fs.readFileSync(newUserDetails.user_image_path);

      userImageBase64 = imageBuffer.toString('base64');
    }

    // Create a new user record with the userImageBase64 data
    const newUser = await User.create({
      user_name: newUserDetails.user_name,
      user_email: newUserDetails.user_email,
      user_password: newUserDetails.user_password,
      user_image: userImageBase64,
      total_orders: newUserDetails.total_orders,
      created_at: new Date(),
      last_logged_in: new Date(),
    });

    // Return a success message or user details
    res.json({ message: 'User inserted successfully', id: newUser.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

