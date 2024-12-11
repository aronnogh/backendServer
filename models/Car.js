const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  carName: { type: String, required: true },
  driverName: { type: String, required: true },
  carNumber: { type: String, required: true },
  brand: { type: String, default: 'Unknown' }, // Set default value
  capacity: { type: Number, default: 4 }, // Set default value
});

const CarModel = mongoose.models.Car || mongoose.model('Car', carSchema);

module.exports = CarModel;