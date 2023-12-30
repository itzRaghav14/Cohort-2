const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 20
  },
  password: {
    type: String,
    required: true
  },
  courses: [{
    type: mongoose.Types.ObjectId,
    ref: 'Course'
  }]
}, {
  timestamps: true
});

const User = mongoose.model('User', UserSchema);

module.exports = User;