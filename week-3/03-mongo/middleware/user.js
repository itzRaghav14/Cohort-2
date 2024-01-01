const User = require('../models/User');
const bcrypt = require('bcrypt');

/**
 * Middleware for handling user auth
 */
const userMiddleware = async (req, res, next) => {
  try {
    const username = req.headers.username;
    const password = req.headers.password;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "username or password is incorrect" });
    }
    
    next();
  }
  catch (err) {
    console.log('Error in user auth middleware')
    next(err);
  }
}

module.exports = userMiddleware;