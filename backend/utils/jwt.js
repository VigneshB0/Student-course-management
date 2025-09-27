const jwt = require('jsonwebtoken');

// JWT Secret (in production, use environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';

// Generate JWT token
const generateToken = (payload, expiresIn = '24h') => {
  try {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
  } catch (error) {
    throw new Error('Token generation failed');
  }
};

// Verify JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token');
    }
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token expired');
    }
    throw new Error('Token verification failed');
  }
};

// Decode JWT token without verification (useful for getting token info)
const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    throw new Error('Token decoding failed');
  }
};

// Check if token is expired
const isTokenExpired = (token) => {
  try {
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.exp) {
      return true;
    }
    
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

// Get token expiration time
const getTokenExpiration = (token) => {
  try {
    const decoded = jwt.decode(token);
    return decoded?.exp ? new Date(decoded.exp * 1000) : null;
  } catch (error) {
    return null;
  }
};

// Refresh token (generate new token with extended expiration)
const refreshToken = (oldToken) => {
  try {
    const decoded = verifyToken(oldToken);
    const { userId, email, role } = decoded;
    
    // Generate new token with same payload but extended expiration
    return generateToken({ userId, email, role });
  } catch (error) {
    throw new Error('Token refresh failed');
  }
};

module.exports = {
  generateToken,
  verifyToken,
  decodeToken,
  isTokenExpired,
  getTokenExpiration,
  refreshToken,
  JWT_SECRET
};