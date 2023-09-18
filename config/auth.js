// config/auth.js

module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'GHOST',
    jwtExpiration: process.env.JWT_EXPIRATION || '1d',
  };
  
  