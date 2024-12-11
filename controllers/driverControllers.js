const DriverModel = require('../models/ModelDriver');
const CarModel = require('../models/Car'); // Import CarModel


// Get driver by ID
const getDriverById = async (req, res) => {
  try {
    const driver = await DriverModel.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get driver by UserName
const getDriverByUserName = async (req, res) => {
  try {
    const driver = await DriverModel.findOne({ userName: req.params.userName });
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Get all drivers
const getAllDrivers = async (req, res) => {
  try {
    const drivers = await DriverModel.find();
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Create a new driver
const createDriver = async (req, res) => {
  const { license, driverName, userName, password, carName, carNumber } = req.body;

  if (!license || !driverName || !userName || !password || !carName || !carNumber) {
    return res.status(400).json({ message: 'All required fields must be provided' });
  }

  try {
    // Create the new driver
    const driver = new DriverModel({
      license,
      driverName,
      userName,
      password,
      carName,
      carNumber,
      // lat: 0, // Default values
      // lng: 0,
      // totalTripToday: 0,
      // totalTripOverAll: 0,
    });

    const newDriver = await driver.save();

    // Create a new car with carName, driverName, and carNumber, others set to null
    const car = new CarModel({
      carName,
      driverName,
      carNumber,
      brand: '-', // Provide a default value
      capacity: 4, // Provide a default value
    });

    const newCar = await car.save();

    // Send response with the newly created driver and car details
    res.status(201).json({
      driver: newDriver,
      car: newCar,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// Update driver by ID
const updateDriverById = async (req, res) => {
  const { license, driverName, userName, password, carName, carNumber } = req.body;

  try {
    const driver = await DriverModel.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    // Update driver fields, if they are provided in the request body
    driver.license = license || driver.license;
    driver.driverName = driverName || driver.driverName;
    driver.userName = userName || driver.userName;
    driver.password = password || driver.password;
    driver.carName = carName || driver.carName;
    driver.carNumber = carNumber || driver.carNumber;
    // driver.lat = lat || driver.lat;
    // driver.lng = lng || driver.lng;
    // driver.totalTripToday = totalTripToday || driver.totalTripToday;
    // driver.totalTripOverAll = totalTripOverAll || driver.totalTripOverAll;

    const updatedDriver = await driver.save();
    res.json(updatedDriver);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete driver by ID
const deleteDriverById = async (req, res) => {
  try {
    const driver = await DriverModel.findByIdAndDelete(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.json({ message: 'Driver deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete all drivers
const deleteAllDrivers = async (req, res) => {
  try {
    await DriverModel.deleteMany(); // Delete all drivers
    res.json({ message: 'All drivers deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update driver's trip count
const updateDriverTrips = async (driverName, tripDate) => {
  try {
    // Find the driver by their name
    const driver = await DriverModel.findOne({ driverName });

    if (!driver) {
      console.log(`Driver ${driverName} not found`);
      return;
    }

    // Get today's date without time for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time part for today
    const tripDateWithoutTime = new Date(tripDate);
    tripDateWithoutTime.setHours(0, 0, 0, 0); // Reset time part for trip date

    // Check if the trip is from today
    const isToday = tripDateWithoutTime.getTime() === today.getTime();

    // Update total trips based on whether it's today or not
    if (isToday) {
      driver.totalTripToday += 1;
    }

    driver.totalTripOverAll += 1;

    // Save the updated driver data
    await driver.save();
    console.log(`Driver ${driverName}'s trips updated successfully`);
  } catch (error) {
    console.log(`Error updating driver trips: ${error.message}`);
  }
};

module.exports = {
  getDriverById,
  getAllDrivers,
  createDriver,
  updateDriverById,
  deleteDriverById,
  deleteAllDrivers,
  updateDriverTrips,
  getDriverByUserName,// Don't forget to export this method if you want to call it in other parts of your app
};
