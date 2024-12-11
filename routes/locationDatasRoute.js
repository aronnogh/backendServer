// server/routes/locationDatasRoute.js
const express = require('express');
const { getLocationDatasById, getAllLocationDatas, createLocationDatas, updateLocationDatasById, deleteLocationDatasById, deleteAllLocationDatas } = require('../controllers/locationDatas');
const router = express.Router();

router.get('/', getAllLocationDatas);
router.get('/:id', getLocationDatasById);
router.post('/', createLocationDatas);  // Route to create a new location data
router.put('/update/:id', updateLocationDatasById);  // Route to update location data by ID
router.delete('/delete/:id', deleteLocationDatasById);  // Route to delete location data by ID
router.delete('/deleteall', deleteAllLocationDatas);  // Route to delete all location data

module.exports = router;
