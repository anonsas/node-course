const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_CONNECTION.replace('<PASSWORD>', process.env.MONGODB_PASSWORD))
  .then((resolve, reject) => {
    console.log('Database connection established');
    app.listen(PORT, () => {
      console.log(`Server has start running on PORT ${PORT}`);
    });
  });
