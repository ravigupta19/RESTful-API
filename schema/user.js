const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 255,
  },
  password: {
    type: String,
    require: true,
    minlength: 6,
    maxlength: 1024,
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;