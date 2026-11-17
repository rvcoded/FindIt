
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  studentId: String,
  department: String,
  joinDate: String,
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
