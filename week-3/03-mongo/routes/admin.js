const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const Admin = require('../models/Admin');
const Course = require('../models/Course');
const zod = require('zod');
const bcrypt = require('bcrypt');

// Admin Routes
router.post('/signup', async (req, res, next) => {
  try {
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
  }
  catch (err) {
    console.log("Error in creating an admin");
    next(err);
  }
});

router.post('/courses', adminMiddleware, async (req, res, next) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink || "";

    const schema = zod.object({
      title: zod.string().min(1).max(32),
      description: zod.string().min(1).max(200),
      price: zod.number(),
      imageLink: zod.string()
    });

    const { success: isValid, error: err } = schema.safeParse({ title, description, price, imageLink });
    if (!isValid) {
      return res.status(422).json({ message: "Invalid inputs", error: err });
    }

    const course = await Course.findOne({ title });

    if (course) {
      return res.status(409).json({ message: "A course with the same title already exists" });
    }

    const admin = await Admin.findOne({ username: req.headers.username });

    const new_course = await Course.create({
      title,
      description,
      price,
      imageLink,
      "admin": admin.id
    });

    admin.courses.push(new_course.id);
    admin.save();

    res.status(200).json({ message: "Course created successfully", courseId: new_course.id });
  }
  catch (err) {
    console.log('Error in creating a course by admin');
    next(err);
  }
});

router.get('/courses', adminMiddleware, async (req, res, next) => {
  try {
    const username = req.headers.username;
    const admin = await Admin.findOne({ username }).populate({
      path: 'courses',
      select: 'id title description price imageLink'
    });

    let courses = admin.courses;

    courses = courses.map(course => {
      const { _id: id, ...result } = course._doc;
      return { id, ...result };
    });

    res.status(200).json({ courses });
  }
  catch (err) {
    console.log('Error in getting resources admin route')
    next(err);
  }
});

module.exports = router;