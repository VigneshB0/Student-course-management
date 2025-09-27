const jwt = require('jsonwebtoken');
const User = require('../models/User');

// JWT Secret (in production, use environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. No token provided.' 
      });
    }

    // Extract token from "Bearer TOKEN"
    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : authHeader;

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. Invalid token format.' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Check if user still exists and is active
    const user = await User.findById(decoded.userId);
    if (!user || !user.isActive) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. User not found or inactive.' 
      });
    }

    // Add user info to request object
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role
    };

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. Invalid token.' 
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. Token expired.' 
      });
    }

    res.status(500).json({ 
      success: false, 
      message: 'Internal server error during authentication.',
      error: error.message 
    });
  }
};

// Optional middleware for role-based access
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. Authentication required.' 
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied. Insufficient privileges.' 
      });
    }

    next();
  };
};

module.exports = authMiddleware;
module.exports.requireRole = requireRole;