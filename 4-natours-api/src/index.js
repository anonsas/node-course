const express = require('express');
const app = express();
const morgan = require('morgan');

const TourRouter = require('./routes/tour.router');
const UserRouter = require('./routes/user.router');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// const auth = (req, res, next) => {
//   console.log('got you');
//   next();
// };

app.use(express.json());
// app.use(auth);
app.use(express.static(`public`));
app.use('/api/users', UserRouter);
app.use('/api/tours', TourRouter);

module.exports = app;
