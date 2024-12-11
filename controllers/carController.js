const CarModel = require('../models/Car');

// Get car by ID
const getCarById = async (req, res) => {
  try {
    const car = await CarModel.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all cars
const getAllCars = async (req, res) => {
  try {
    const cars = await CarModel.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new car
const createCar = async (req, res) => {
  const { carName, driverName, carNumber, brand, capacity } = req.body;

  if ( !carName || !driverName || !carNumber || !brand || !capacity) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const car = new CarModel({
    carName,
    driverName,
    carNumber,
    brand,
    capacity,
  });

  try {
    const newCar = await car.save();
    res.status(201).json(newCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update car by ID
const updateCarById = async (req, res) => {
  const { carName, driverName, carNumber, brand, capacity } = req.body;

  try {
    const car = await CarModel.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Update fields if provided
    car.carName = carName || car.carName;
    car.driverName = driverName || car.driverName;
    car.carNumber = carNumber || car.carNumber;
    car.brand = brand || car.brand;
    car.capacity = capacity || car.capacity;

    const updatedCar = await car.save();
    res.json(updatedCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete car by ID
const deleteCarById = async (req, res) => {
  try {
    const car = await CarModel.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json({ message: 'Car deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete all cars
const deleteAllCars = async (req, res) => {
  try {
    await CarModel.deleteMany();
    res.json({ message: 'All cars deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCarById,
  getAllCars,
  createCar,
  updateCarById,
  deleteCarById,
  deleteAllCars,
};
