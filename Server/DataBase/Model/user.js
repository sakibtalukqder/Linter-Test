const mongoose = require('mongoose');


// User Schema...
const UserSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  Phoen_No: {
    type: Number,
  },
  uid: {
    type: String,
    required: true,
  },

}, { timestamps: true })


// User Model...
const User = mongoose.model("User", UserSchema);

module.exports = User;