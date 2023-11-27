const express = require('express');
const app = express();
const TourRouter = require('./routes/tour.router');
const UserRouter = require('./routes/user.router');
const morgan = require('morgan');

// const auth = (req, res, next) => {
//   console.log('got you');
//   next();
// };

app.use(morgan('dev'));
app.use(express.json());
// app.use(auth);
app.use('/api/users', UserRouter);
app.use('/api/tours', TourRouter);

module.exports = app;
