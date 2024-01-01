const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');

/**
 * Middleware for handling admin auth
 */
const adminMiddleware = async (req, res, next) => {
  try {
    const username = req.headers.username;
    const password = req.headers.password;
    
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(404).json({ message: "user not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "username or password is incorrect" });
    }

    next();
  }
  catch (err) {
    console.log('Error in admin auth middleware')
    next(err);
  }
}

module.exports = adminMiddleware;