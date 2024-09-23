// Middleware for verifying JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Unauthorized Request' });

  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    req.user = decoded; // Attach user information to req.user
    next();
  } catch (error) {
    console.error('JWT verification failed:', error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = verifyToken;
