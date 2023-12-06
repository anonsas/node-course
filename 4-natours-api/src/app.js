const express = require('express');
const morgan = require('morgan');

const app = express();

const TourRouter = require('./routes/tour.router');
const UserRouter = require('./routes/user.router');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`public`));
app.use('/api/users', UserRouter);
app.use('/api/tours', TourRouter);

module.exports = app;
