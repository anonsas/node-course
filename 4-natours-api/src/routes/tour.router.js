const express = require('express');

const router = express.Router();
const TourController = require('../controllers/tour.controller');

router.param('id', TourController.checkID); // Param middleware, fires on "id"

router.get('/', TourController.getTours);
router.get('/:id', TourController.getTour);
router.post('/', TourController.checkBody, TourController.createTour);
router.patch('/:id', TourController.updateTour);
router.delete('/:id', TourController.deleteTour);

module.exports = router;
