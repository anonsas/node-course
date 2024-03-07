const TourModel = require('../model/tour.model');

class APIFeatures {
  constructor(model, queryParams) {
    this.model = model;
    this.queryParams = queryParams;
    console.log('queryParams', queryParams);
  }

  filter() {
    let queryJSON = JSON.stringify(this.queryParams);
    queryJSON = queryJSON.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    this.model = this.model.find(JSON.parse(queryJSON));

    return this;
  }

  sort() {
    if (this.queryParams.sort) {
      const sortBy = this.queryParams.sort.replaceAll(',', ' ');
      console.log('sortBy', sortBy);
      this.model = this.model.sort(sortBy);
    } else {
      this.model = this.model.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.queryParams.fields) {
      const limitFieldsBy = this.queryParams.fields.replaceAll(',', ' ');
      console.log('limitFieldsBy', limitFieldsBy);
      this.model = this.model.select(limitFieldsBy);
    } else {
      this.model = this.model.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = this.queryParams.page * 1 || 1;
    const limit = this.queryParams.limit * 1 || 10;
    const skip = (page - 1) * limit; // Ex. page: 2, show: 11-20
    this.model = this.model.skip(skip).limit(limit);

    return this;
  }
}

class TourController {
  async getTopTours(req, res, next) {
    // api/tours?limit=5,sort=-ratingsAverage,price
    req.query.limit = 5;
    req.query.sort = '-ratingsAverage,price';
    next();
  }

  async getTours(req, res, next) {
    try {
      const features = new APIFeatures(TourModel.find(), req.query).filter().sort().limitFields().paginate();
      const tours = await features.model;
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
