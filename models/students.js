const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

const userModel = mongoose.model("students", UserSchema);

module.exports = userModel;