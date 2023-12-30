const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    minLength: 1,
    maxLength: 32
  },
  description: {
    type: String,
    require: true,
    minLength: 1,
    maxLength: 200
  },
  price: {
    type: Number,
    require: true,
  },
  imageLink: {
    type: String,
    default: ''
  },
  admin: {
    type: mongoose.Types.ObjectId,
    ref: 'Admin',
    required: true
  }
}, {
  timestamps: true
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;