const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  license: { type: String, required: true, unique: true },
  driverName: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  
  // Car details - assuming driver can have multiple cars
  cars: [{
    carName: { type: String, required: true },
    carNumber: { type: String, required: true },
    brand: { type: String, default: 'Unknown' },
    capacity: { type: Number, default: 4 },
  }],

  // Geographical data
  lat: { type: String, required: true },
  lng: { type: String, required: true },

  // Trip details - assuming driver can have multiple trips
  trips: [{
    startLocation: { type: String, required: true, trim: true },
    endLocation: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    time: { type: String, required: true, match: /^([01]\d|2[0-3]):?([0-5]\d)$/ },
    distance: { type: Number, required: true, min: 0 },
    createdAt: { type: Date, default: Date.now } // Automatically manage creation timestamp
  }],

  totalTripToday: { type: Number, required: true },
  totalTripOverall: { type: Number, required: true },
});

const DriverCarTripModel = mongoose.models.DriverCarTrip || mongoose.model('DriverCarTrip', driverSchema);

module.exports = DriverCarTripModel;
