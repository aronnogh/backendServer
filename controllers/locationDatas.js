const LocationDatasModel = require('../models/LocationDatas');

// Get locationDatas by ID
const getLocationDatasById = async (req, res) => {
  try {
    const locationDatas = await LocationDatasModel.findById(req.params.id);
    if (!locationDatas) {
      return res.status(404).json({ message: 'LocationDatas not found' });
    }
    res.json(locationDatas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all locationDatas
const getAllLocationDatas = async (req, res) => {
  try {
    const locationDatass = await LocationDatasModel.find();
    res.json(locationDatass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new locationDatas
const createLocationDatas = async (req, res) => {
  const { lat, lng, locationName } = req.body;

  // Validate that all required fields are present
  if (!lat || !lng || !locationName) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const locationDatas = new LocationDatasModel({
    lat,
    lng,
    locationName,
  });

  try {
    // Save the new location data
    const newLocationDatas = await locationDatas.save();

    res.status(201).json(newLocationDatas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Update locationDatas by ID
const updateLocationDatasById = async (req, res) => {
  const { driverName, startLocation, endLocation, date, time, distance } = req.body;

  try {
    const locationDatas = await LocationDatasModel.findById(req.params.id);
    if (!locationDatas) {
      return res.status(404).json({ message: 'LocationDatas not found' });
    }

    // Update locationDatas fields if they are provided in the request body
    locationDatas.driverName = driverName || locationDatas.driverName;
    locationDatas.startLocation = startLocation || locationDatas.startLocation;
    locationDatas.endLocation = endLocation || locationDatas.endLocation;
    locationDatas.date = date || locationDatas.date;
    locationDatas.time = time || locationDatas.time;
    locationDatas.distance = distance || locationDatas.distance;

    const updatedLocationDatas = await locationDatas.save();
    res.json(updatedLocationDatas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete locationDatas by ID
const deleteLocationDatasById = async (req, res) => {
  try {
    const locationDatas = await LocationDatasModel.findByIdAndDelete(req.params.id);
    if (!locationDatas) {
      return res.status(404).json({ message: 'LocationDatas not found' });
    }
    res.json({ message: 'LocationDatas deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete all locationDatas
const deleteAllLocationDatas = async (req, res) => {
  try {
    await LocationDatasModel.deleteMany(); // Delete all locationDatass
    res.json({ message: 'All locationDatass deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getLocationDatasById,
  getAllLocationDatas,
  createLocationDatas,
  updateLocationDatasById,
  deleteLocationDatasById,
  deleteAllLocationDatas,
};
