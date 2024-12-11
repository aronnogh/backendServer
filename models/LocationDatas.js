const mongoose = require('mongoose');

const locationDatasSchema = new mongoose.Schema({
  lat: { type: String, required: true },
  lng: { type: String, required: true },
  locationName: { type: String, required: true}
});

const LocationDatasModel = mongoose.models.LocationDatas || mongoose.model('LocationDatas', locationDatasSchema);

module.exports = LocationDatasModel;