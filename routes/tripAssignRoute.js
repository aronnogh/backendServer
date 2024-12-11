const express = require('express');
const {
  getTripAssignById,
  getAllTripAssigns,
  createTripAssign,
  updateTripAssignById,
  deleteTripAssignById,
  deleteAllTripAssigns,
  markTripAsDone
} = require('../controllers/tripAssignController');
const TripAssignModel = require('../models/ModelTripAssign');  // Adjust the path as necessary


const router = express.Router();
// const moment = require('moment');


// Routes for trip assignments
router.get('/', getAllTripAssigns);
router.get('/:id', getTripAssignById);
router.post('/create-new-trip', createTripAssign);
router.put('/update/:id', updateTripAssignById);
router.delete('/delete/:id', deleteTripAssignById);
router.delete('/deleteall', deleteAllTripAssigns);
router.put('/:id/done', markTripAsDone);


// Past trips route with "done" status consideration
router.get('/pastTrips/:userName', async (req, res) => {
  const { userName } = req.params;
  try {
    // Log the userName to check if it is correctly passed
    console.log('Fetching past trips for user:', userName);

    // Ensure the query is correct
    const query = { 
      userName,          // Only fetch trips for the specific user
      done: true         // Only trips marked as done
    };

    // Fetch trips from the database
    const trips = await TripAssignModel.find(query);

    // Log the result for debugging
    console.log('Fetched trips:', trips);

    // If no trips are found, send an appropriate response
    if (trips.length === 0) {
      return res.status(404).json({ message: 'No past trips found for this user' });
    }

    // Send the trips data in the response
    res.status(200).json(trips);
  } catch (error) {
    // Log the error for debugging
    console.error('Error fetching past trips:', error);

    // Send a generic error message
    res.status(500).json({ message: 'Error fetching past trips' });
  }
});


// Upcoming trips route with "done" status and date consideration
router.get('/upcomingTrips/:userName', async (req, res) => {
  const { userName } = req.params; // Extract userName from request params

  try {
    // Define the query to fetch trips based on userName and "done" status
    const query = {
      userName,              // Match trips for the specified user
      done: { $ne: true },   // Fetch trips that are not marked as done (done is not true)
    };

    // Fetch upcoming trips from the database using the query
    const trips = await TripAssignModel.find(query);

    // Log the fetched trips for debugging purposes
    console.log('Fetched upcoming trips:', trips);

    // Check if no trips are found
    if (!trips || trips.length === 0) {
      return res.status(404).json({ message: 'No upcoming trips found for this user' });
    }

    // Send the trips data in the response
    res.status(200).json(trips);
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error fetching upcoming trips:', error);

    // Send an error response with a generic message
    res.status(500).json({ message: 'Error fetching upcoming trips' });
  }
});





module.exports = router;
