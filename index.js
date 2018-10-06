const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const genres = require('./routes/genre');

/**
 * Start server and
 * load the env variables
 */
const app = express();
dotenv.load();

const port = process.env.SERVER_PORT;

/**
 * Connect to the mongoDB
 */
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error(`Unable to connect. Error - ${error}`);
  });

app.use(express.json());

app.use(function(req, res, next) {
  console.log('Logging ...');
  next();
});

app.use(function(req, res, next) {
  console.log('Authencating ...');
  next();
});

/**
 * Adding all the routes
 */
app.use('/api/genres', genres);

app.get('/', (req, res) => {
  res.send('Its working');
});

app.listen(port, () => `listening at ${port}`);
