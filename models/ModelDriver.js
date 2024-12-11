const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  license: { type: String, required: true, unique: true },
  driverName: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  carName: { type: String, required: true },
  carNumber: { type: String, required: true },
  // lat: { type: String, required: true },
  // lng: { type: String, required: true },
  // totalTripToday: { type: Number, required: true },
  // totalTripOverAll: { type: Number, required: true },
});

const DriverModel = mongoose.models.Driver || mongoose.model('Driver', driverSchema);

module.exports = DriverModel;
