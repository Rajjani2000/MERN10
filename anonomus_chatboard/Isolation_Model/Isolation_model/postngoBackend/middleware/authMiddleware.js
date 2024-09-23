const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).send({ message: 'No token provided.' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token from the Authorization header

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        console.error('Token is expired');
        return res.status(401).send({ message: 'Token expired.' });
      } else {
        console.error('Failed to authenticate token:', err.message);
        return res.status(500).send({ message: 'Failed to authenticate token.' });
      }
    }

    // If everything is good, save the decoded token to the request for use in other routes
    req.userId = decoded.userId; // Adjusted to use 'userId' from the decoded token
    next();
  });
}

module.exports = verifyToken;
