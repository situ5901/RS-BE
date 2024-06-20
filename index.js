const express = require('express');
const mongoose = require('mongoose');
const router = require("./models/router"); // import the router
const cors = require('cors');
require("dotenv").config();
const PORT = process.env.PORT || 3001;

const app = express();
const userModel = require('./models/students');

app.use(express.json()); // parse JSON bodies
app.use(cors()); // enable CORS
app.use(router); // use the router

app.get('/data', async (req, res) => {
  try {
    const users = await userModel.find().exec();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

mongoose.connect("mongodb://127.0.0.1:27017/repodb", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});