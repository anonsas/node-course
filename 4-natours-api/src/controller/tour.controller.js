const fs = require('fs');
const TourModel = require('../model/tour.model');

class TourController {
  checkBody(req, res, next) {
    const newTour = req.body;
    if (!newTour.name || !newTour.price)
      return res.status(400).json({
        status: 'fail',
        message: 'Missing name or price',
      });
    next();
  }

  getTours(req, res) {
    res.status(200).json({
      status: 'success',
      results: toursData.length,
      data: { tours: toursData },
    });
  }

  getTour(req, res) {
    const id = +req.params.id;
    const tour = toursData.find((t) => t.id === id);
    res.status(200).json({
      status: 'success',
      data: { tour: tour },
    });
  }

  async createTour(req, res) {
    const newTour = req.body;
    try {
      const saveNewTour = TourModel({ name: newTour.name, rating: newTour.rating, price: newTour.price });
      await saveNewTour.save();
      res.status(201).json({
        status: 'success',
        data: { tour: saveNewTour },
      });
    } catch (error) {
      res.json(error.message);
    }
  }

  updateTour(req, res) {
    const id = +req.params.id;
    const tourUpdate = req.body;
    const selectedTour = toursData.find((tour) => tour.id === id);
    const updatedTour = { ...selectedTour, ...tourUpdate };
    const newToursList = toursData.map((tour) => (tour.id === updatedTour.id ? { ...updatedTour } : tour));
    fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(newToursList), (error) => {
      if (error) throw "Couldn't update a tour";
      res.status(200).json({
        status: 'success',
        data: { tour: updatedTour },
      });
    });
  }

  deleteTour(req, res) {
    const id = +req.params.id;
    const index = toursData.findIndex((tour) => tour.id === id);
    toursData.splice(index, 1);
    fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(toursData), (error) => {
      if (error) throw "Couldn't delete a tour";
      res.status(200).json({
        status: 'success',
      });
    });
  }
}

module.exports = new TourController();
