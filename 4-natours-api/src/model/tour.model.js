const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: { type: String, required: [true, 'A tour must have a name'], unique: true },
  rating: { type: Number, default: 4.5 },
  price: { type: Number, required: [true, 'A tour must have a price'] },
});

const TourModel = model('Tour', schema);
module.exports = TourModel;
