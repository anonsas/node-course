const express = require('express');
const router = express.Router();
const TourController = require('../controllers/tour.controller');

router.get('/', TourController.getTours);
router.get('/:id', TourController.getTour);
router.post('/', TourController.createTour);
router.patch('/:id', TourController.updateTour);
router.delete('/:id', TourController.deleteTour);

module.exports = router;
