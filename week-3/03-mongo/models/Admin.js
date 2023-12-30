const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
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

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;