const mongoose = require("mongoose");

const PopSchema = new mongoose.Schema({
  name: String,
});

const popModel = mongoose.model("popup", PopSchema);

module.exports = popModel;  