const jwt = require('jsonwebtoken');

// Middleware for handling auth
const adminMiddleware = (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        const token = auth.split(" ")[1];
        const secret = process.env.JWT_SECRET;

        try {
            const {username, password} = jwt.verify(token, secret);
            req.headers.username = username;
            next();
        }
        catch (err) {
            return res.status(401).json({ message: "Authentication failed" });
        }
    }
    catch (err) {
        console.log('Error in admin auth middleware');
        next(err);
    }
}

module.exports = adminMiddleware;