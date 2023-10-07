const mongoose = require('mongoose');

// User Schema...
const UserSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    unique: true,
    required: true,
  },
  image: {
    type: String,
  },
  Phoen_No: {
    type: Number,
    // unique: true,
  },

}, { timestamps: true })


// User Model...
const User = mongoose.model("User", UserSchema);

module.exports = User;