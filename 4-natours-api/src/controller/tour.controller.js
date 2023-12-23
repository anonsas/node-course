const TourModel = require('../model/tour.model');

class TourController {
  async getTours(req, res) {
    try {
      let queryJSON = JSON.stringify(req.query);
      queryJSON = queryJSON.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
      const query = TourModel.find(JSON.parse(queryStr));
      const tours = await query;
      // const tours = await TourModel.find().lte('price', 1500).gte('duration', 5).where('difficulty').equals('easy');
      res.status(200).json({
        status: 'success',
        results: tours.length,
        data: { tours },
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  async getTour(req, res) {
    try {
      const id = req.params.id;
      const tour = await TourModel.findById(id);
      res.status(200).json({
        status: 'success',
        data: { tour },
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  async createTour(req, res) {
    try {
      const tour = await TourModel.create(req.body);
      res.status(201).json({ status: 'success', data: { tour } });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  async updateTour(req, res) {
    try {
      const id = req.params.id;
      const updatedTour = req.body;
      const tour = await TourModel.findByIdAndUpdate(id, updatedTour, { new: true, runValidators: true });
      res.status(200).json({
        status: 'success',
        data: { tour },
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  async deleteTour(req, res) {
    try {
      const id = req.params.id;
      await TourModel.findByIdAndDelete(id);
      res.status(200).json({
        status: 'success',
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message,
      });
    }
  }
}

module.exports = new TourController();
