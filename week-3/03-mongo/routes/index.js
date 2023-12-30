const express = require('express');
const router = express.Router();

router.use('/admin', require('./admin'));
router.use('/user', require('./user'));

router.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Some error occured" });
})

module.exports = router;