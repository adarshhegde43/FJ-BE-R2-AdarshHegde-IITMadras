const jwt = require('jsonwebtoken');

// Middleware to verify JWT
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from header

    if (!token) {
        return res.status(403).json({ message: 'Access denied, no token provided' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Store decoded user info in request object
        next();  // Allow the request to continue to the next middleware or route
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authenticateJWT;
