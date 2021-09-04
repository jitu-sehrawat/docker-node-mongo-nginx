const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose');
const cors = require('cors');
const redis = require('redis');
const session = require('express-session');
let RedisStore = require('connect-redis')(session)

const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, SESSION_SECRET, REDIS_PORT} = require('./config/config');
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoute');

let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT
});

const app = express();

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

app.enable('trust proxy');
app.use(cors());
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      saveUninitialized: false,
      resave: false,
      secure: false,
      httpOnly: true,
      maxAge: 300000000
    }
  })
)
app.use(morgan('combined'));
app.use(express.json());

app.get(`/api/v1`, (req, res) => {
  res.send(`<h2>Hi There !!!!!!!!!!!!!!!!<h2/> ${process.env.NODE_ENV}`)
});
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));