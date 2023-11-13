const express = require('express');
const app = express();

app.use(express.json());

const validationHandler = (req, res, next) => {
  console.log('Op op');
  next();
};

app.get('/', validationHandler, (req, res) => {
  res.status(200).json('Hello');
});

app.post('/', (req, res) => {
  //req.query req.params req.body
  console.log(req.query);
  console.log(req.params);
  console.log(req.body);
  res.status(200).json('You have posted');
});

app.listen(4000);
