const { Router } = require("express");
const userMiddleware = require("../middleware/user");
const router = Router();
const User = require('../models/User');
const Course = require('../models/Course');
const zod = require('zod');
const bcrypt = require('bcrypt');

// User Routes
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

    const user = await User.findOne({ username });

    // if some author is already present with the entered username
    if (user) {
      return res.status(409).json({ message: "username is already taken" });
    }

    password = await bcrypt.hash(password, 10);

    await User.create({ username, password });
    res.status(200).json({ message: "User created successfully" });
  }
  catch (err) {
    console.log("Error in creating a user");
    next(err);
  }
});

router.post('/signin', async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const secret = process.env.JWT_SECRET;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "username or password is incorrect" });
    }

    const token = jwt.sign({ username, password }, secret);
    res.json({ token });
  }
  catch (err) {
    console.log('Error in signing up admin');
    next(err);
  }
});

router.get('/courses', async (req, res, next) => {
  try {
    const courses = (await Course.find({}))
      .map(({ _id, title, description, price, imageLink, ...rest }) => {
        return {
          id: _id,
          title,
          description,
          price,
          imageLink
        }
      });
    res.json({ courses });
  }
  catch (err) {
    console.log("Error in getting all courses");
    next(err);
  }
});

router.post('/courses/:courseId', userMiddleware, async (req, res, next) => {
  // for buying the courseId
  // find the user and course (to make sure that the course exist)
  // check if the course is already bought or not
  // add the courseId to user.courses

  try {
    const courseId = req.params.courseId;

    const { success: isValid, error: err } = zod.string().safeParse(courseId);
    if (!isValid) {
      return res.status(422).json({ message: "Invalid inputs", error: err });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const user = await User.findOne({ username: req.headers.username });

    const isAlreadyPurchased = user.courses.find(cid => cid === courseId);
    if (isAlreadyPurchased) {
      return res.status(403).json({ message: "You've already purchased this course" });
    }

    user.courses.push(courseId);
    user.save();

    res.json({ message: "Course purchased successfully" })
  }
  catch (err) {
    console.log("Error in buying a course");
    next(err);
  }
});

router.get('/purchasedCourses', userMiddleware, async (req, res, next) => {
  // for fetching all purchased courses
  // fetch the user
  // populate the courses with title, desc...
  // return the courses array

  try {
    const user = await User.findOne({ username: req.body.username }).populate('courses');
    const courses = user.courses.map(course => {
      return { _id: id, title, description, price, imageLink } = course;
    });
    res.json({ courses });
  }
  catch (err) {
    console.log("Error in fetching purchased courses");
    next(err);
  }
});

module.exports = router