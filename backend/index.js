const express = require('express');
const mongoDB = require('./db');
require('colors');
const routes = require('./routes/CreateUser');

const app = express();
const port = 5000;

mongoDB();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
  console.log(`App listening to port ${port}`.yellow);
});
