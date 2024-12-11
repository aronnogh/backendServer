const express = require('express');
const { getCarById, getAllCars, createCar, updateCarById, deleteCarById, deleteAllCars } = require('../controllers/carController');
const router = express.Router();

router.get('/', getAllCars);
router.get('/:id', getCarById);
router.post('/', createCar);  // Route to create a car
router.put('/update/:id', updateCarById);  // Route to update car by ID
router.delete('/delete/:id', deleteCarById);  // Route to delete car by ID
router.delete('/deleteall', deleteAllCars);  // Route to delete all cars

module.exports = router;
