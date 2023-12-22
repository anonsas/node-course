const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config({ path: './.env.development' });
const TourModel = require('../../src/model/tour.model');

mongoose
  .connect(process.env.MONGODB_CONNECTION.replace('<PASSWORD>', process.env.MONGODB_PASSWORD))
  .then((resolve, reject) => {
    console.log('Database connection established');
  })
  .catch((error) => console.log('Database connection failed', error.message));

const tours = JSON.parse(fs.readFileSync(__dirname + '/tours-simple.json', 'utf-8'));

const importTours = async () => {
  try {
    await TourModel.create(tours);
    console.log('Tours import success');
    process.exit();
  } catch (error) {
    console.log('Tours import failed');
  }
};

const deleteTours = async () => {
  try {
    await TourModel.deleteMany();
    console.log('Tours deletion success');
    process.exit();
  } catch (error) {
    console.log('Tours import failed');
  }
};

if (process.argv[2] === '--import') {
  importTours();
} else if (process.argv[2] === '--delete') {
  deleteTours();
}

console.log('here', process.argv);
