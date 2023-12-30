const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const Admin = require('../models/Admin');
const zod = require('zod');
const bcrypt = require('bcrypt');

// Admin Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    let password = req.body.password;
    
    const schema = zod.object({
        username: zod.string().min(1).max(20),
        password: zod.string().min(6).max(12)
    });
    
    const { success: isValid, error: err } = schema.safeParse({ username, password });
    if (!isValid) {
        return res.status(422).json({ message: "Invalid inputs", error: err });
    }
    
    const admin = await Admin.findOne({ username });

    // if some author is already present with the entered username
    if (admin) {
        return res.status(409).json({ message: "username is already taken" });
    }

    password = await bcrypt.hash(password, 10);

    await Admin.create({ username, password });
    res.status(200).json({ message: "Admin created successfully" });
});

router.post('/courses', adminMiddleware, async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;
    
    // const schema = 

    const admin = await Admin.findOne({ username: req.headers.username });

    
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
});

module.exports = router;