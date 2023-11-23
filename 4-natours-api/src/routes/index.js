const express = require('express');
const TourController = require('../controllers/tour.controller');

const router = express.Router();

// Tours
router.get('/tours', TourController.getTours);
router.get('/tours/:id', TourController.getTourById);
router.post('/tours', TourController.createTour);
router.patch('/tours/:id', TourController.updateTourById);
router.delete('/tours/:id', TourController.deleteTourById);

module.exports = router;
