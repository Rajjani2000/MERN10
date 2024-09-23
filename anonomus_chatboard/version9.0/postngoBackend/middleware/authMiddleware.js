// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticateMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    console.log('Incoming Token:', token); // Add this line
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify the token and get user information
    const decoded = jwt.verify(token, 'your-secret-key');
    req.user = decoded.user; // Attach user information to req.user

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('JWT verification failed:', error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authenticateMiddleware;
