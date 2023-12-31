const express = require('express');
const mongoDB = require('./db');
require('colors');
const routes = require('./routes/CreateUser');

const app = express();
const port = 5000;

mongoDB();

// for cross origin CORS error
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use(express.json());
app.use('/api', require('./routes/CreateUser'));
app.use('/api', require('./routes/DisplayData'));
app.use('/api', require('./routes/OrderData'));

app.listen(port, () => {
  console.log(`App listening to port ${port}`.yellow);
});
