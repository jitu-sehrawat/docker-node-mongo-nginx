const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT} = require('./config/config');
const postRouter = require('./routes/postRoutes');

const app = express();

app.use(morgan('combined'));
app.use(express.json());
// here "mongo" is the name of Mongodb Service name compose file
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
const connectWithRetry = () => {
  mongoose
    .connect(mongoURL)
    .then(() => console.log("Connected to DB"))
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

app.get(`/`, (req, res) => {
  res.send(`<h2>Hi There !!!<h2/> ${process.env.NODE_ENV}`)
});
app.use('/api/v1/posts', postRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));