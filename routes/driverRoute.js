const express = require('express');
const { 
  getDriverById, 
  getAllDrivers, 
  createDriver, 
  updateDriverById, 
  deleteDriverById, 
  deleteAllDrivers, 
  getDriverByUserName 
} = require('../controllers/driverControllers');
const router = express.Router();

// Routes for drivers
router.get('/', getAllDrivers);  // /api/drivers/
router.get('/:id', getDriverById);  // /api/drivers/:id
router.post('/', createDriver);  // /api/drivers/
router.put('/update/:id', updateDriverById);  // /api/drivers/update/:id
router.delete('/delete/:id', deleteDriverById);  // /api/drivers/delete/:id
router.delete('/deleteall', deleteAllDrivers);  // /api/drivers/deleteall
router.get('/username/:userName', getDriverByUserName);  // /api/drivers/username/:userName

module.exports = router;
