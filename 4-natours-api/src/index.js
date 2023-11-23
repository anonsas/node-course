const express = require('express');
const app = express();
const router = require('./routes');
const morgan = require('morgan');
const auth = (req, res, next) => {
  console.log('got you');
  next();
};

const myLogger = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

app.use(express.json());
app.use(auth, myLogger);
app.use('/api', router);

app.listen(4000);
