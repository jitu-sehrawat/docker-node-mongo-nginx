const express = require('express');
const mongoose = require('mongoose');

const app = express();

// here "mongo" is the name of Mongodb Service name compose file
mongoose.connect('mongodb://root:Cardekho123@mongo:27017/?authSource=admin')
  .then(() => console.log("Connected to DB"))
  .catch((e) => console.log(e));

app.get(`/`, (req, res) => {
  res.send(`<h2>Hi There !!!<h2/> ${process.env.NODE_ENV}`)
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));