const TourModel = require('../model/tour.model');

class TourController {
  async getTopTours(req, res, next) {
    req.query.limit = 5;
    req.query.sort = '-ratingsAverage,price';
    next();
  }

  async getTours(req, res) {
    try {
      console.log(req.query);
      const excludedFields = ['page', 'sort', 'limit', 'fields'];

      // Filtering
      let queryJSON = JSON.stringify(req.query);
      queryJSON = queryJSON.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
      let query = TourModel.find(JSON.parse(queryJSON));

      // Sorting
      if (req.query.sort) {
        const sortBy = req.query.sort.replaceAll(',', ' ');
        console.log('sortBy', sortBy);
        query.sort(sortBy);
      } else {
        query.sort('-createdAt');
      }

      // Limiting Fields
      if (req.query.fields) {
        const limitFieldsBy = req.query.fields.replaceAll(',', ' ');
        console.log('limitFieldsBy', limitFieldsBy);
        query.select(limitFieldsBy);
      } else {
        query.select('-__v');
      }

      // Pagination
      const page = req.query.page * 1 || 1;
      const limit = req.query.limit * 1 || 10;
      const skip = (page - 1) * limit; // Ex. page: 2, show: 11-20
      query.skip(skip).limit(limit);

      if (req.query.page) {
        const toursCount = await TourModel.countDocuments();
        console.log('toursCount', toursCount);
        if (skip >= toursCount) {
          throw new Error('This page does not exist');
        }
      }

      const tours = await query;
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
