const express = require('express');
const app = express();
const tourRouter = require('./routes/tour.router');
const userRouter = require('./routes/user.router');
const morgan = require('morgan');

console.log(userRouter);

const auth = (req, res, next) => {
  console.log('got you');
  next();
};

app.use(morgan('dev'));
app.use(express.json());
app.use(auth);
app.use('/api/users', userRouter);
app.use('/api/tours', tourRouter);

app.listen(4000);
