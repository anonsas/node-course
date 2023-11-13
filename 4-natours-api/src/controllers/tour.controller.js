const fs = require('fs');

const toursData = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

class TourController {
  getTours(req, res) {
    res.status(200).json({
      status: 'success',
      results: toursData.length,
      data: { tours: toursData },
    });
  }

  getTourById(req, res) {
    const id = +req.params.id;
    const selectedTour = toursData.find((tour) => tour.id === id);
    if (!selectedTour) {
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid ID',
      });
    }
    res.status(200).json({
      status: 'success',
      data: { tour: selectedTour },
    });
  }

  createTour(req, res) {
    const newTour = req.body;
    toursData.push(newTour);

    fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(toursData), (error) => {
      if (error) throw "Couldn't write a new tour";
      res.status(201).json({
        status: 'success',
        data: { tour: newTour },
      });
    });
  }

  updateTourById(req, res) {
    const id = +req.params.id;
    const tourUpdate = req.body;
    const selectedTour = toursData.find((tour) => tour.id === id);
    const updatedTour = { ...selectedTour, ...tourUpdate };
    const newTours = toursData.map((tour) => (tour.id === updatedTour.id ? { ...updatedTour } : tour));
    fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(newTours), (error) => {
      if (error) throw "Couldn't update a tour";
      res.status(200).json({
        status: 'success',
        data: { tour: updatedTour },
      });
    });
  }
}

module.exports = new TourController();