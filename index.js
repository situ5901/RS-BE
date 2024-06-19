const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 3001;

const app = express();
const userModel = require('./models/students');

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/repodb", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

app.get('/data', (req, res) => {
  userModel.find()
    .then(students => res.json(students))
    .catch(err => res.json(err));
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
