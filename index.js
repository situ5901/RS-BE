const express = require('express');
const mongoose = require('mongoose');
const router = require("./models/router"); // import the router
const cors = require('cors');
const path = require('path');
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const app = express();
const userModel = require('./models/students');
const popModel = require('./models/popups');

app.use(express.json()); // parse JSON bodies
app.use(cors()); // enable CORS
app.use(router); // use the router

app.get('/data', async (req, res) => {
  console.log("Feath data.....");
  try {
    const users = await userModel.find().exec();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

app.get('/popup', async (req, res) => {
  console.log("Feath Popup.....");
  try {
    const pops = await popModel.find().exec();
    res.json(pops);
  } catch (err) {
    console.error(err);
    res.status(500).json({ Message: "Error fetching PopupData" });
  }
});

// Updated MongoDB connection string
mongoose.connect("mongodb+srv://RS-Tech:er.situkumar.com@cluster0.icf0z.mongodb.net/RS-Tech?retryWrites=true&w=majority")

  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
