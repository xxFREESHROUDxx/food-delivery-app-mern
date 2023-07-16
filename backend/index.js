const express = require('express');
const mongoDB = require('./db');
require('colors');

const app = express();
const port = 5000;

mongoDB();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App listening to port ${port}`.yellow);
});
