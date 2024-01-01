const jwt = require('jsonwebtoken');

function userMiddleware(req, res, next) {
  try {
    const auth = req.headers.authorization;
    const token = auth.split(" ")[1];
    const secret = process.env.JWT_SECRET;

    try {
      const { username, password } = jwt.verify(token, secret);
      req.headers.username = username;
      next();
    }
    catch (err) {
      return res.status(401).json({ message: "Authentication failed" });
    }
  }
  catch (err) {
    console.log('Error in user auth middleware');
    next(err);
  }
}

module.exports = userMiddleware;