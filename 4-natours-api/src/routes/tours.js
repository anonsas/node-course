const express = require('express');
const toursData = require('../../dev-data/data/tours.json');

const router = express.Router();

router.get('/api/tours', (req, res) => {
  res.send(toursData);
});
