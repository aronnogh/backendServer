const TripAssignModel = require('../models/ModelTripAssign');
const moment = require('moment');

// Get tripAssign by ID
const getTripAssignById = async (req, res) => {
  try {
    const tripAssign = await TripAssignModel.findById(req.params.id); // Ensure a valid ObjectId is used here
    if (!tripAssign) {
      return res.status(404).json({ message: 'TripAssign not found' });
    }
    res.json(tripAssign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all tripAssigns
const getAllTripAssigns = async (req, res) => {
  try {
    const trips = await TripAssignModel.find();
    res.status(200).json(trips);
  } catch (error) {
    console.error('Error fetching trips:', error);
    res.status(500).json({ message: 'Error fetching trips' });
  }
};

// Create a new tripAssign
const createTripAssign = async (req, res) => {
  const { userName, driverName, startLocation, endLocation, date, time, distance } = req.body;

  if (!userName || !driverName || !startLocation || !endLocation || !date || !time || distance === undefined) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const tripAssign = new TripAssignModel({
    userName,
    driverName,
    startLocation,
    endLocation,
    date,
    time,
    distance,
  });

  try {
    const newTripAssign = await tripAssign.save();
    res.status(201).json(newTripAssign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update tripAssign by ID
const updateTripAssignById = async (req, res) => {
  const { userName, driverName, startLocation, endLocation, date, time, distance } = req.body;

  try {
    const tripAssign = await TripAssignModel.findById(req.params.id);
    if (!tripAssign) {
      return res.status(404).json({ message: 'TripAssign not found' });
    }

    tripAssign.userName = userName || tripAssign.userName;
    tripAssign.driverName = driverName || tripAssign.driverName;
    tripAssign.startLocation = startLocation || tripAssign.startLocation;
    tripAssign.endLocation = endLocation || tripAssign.endLocation;
    tripAssign.date = date || tripAssign.date;
    tripAssign.time = time || tripAssign.time;
    tripAssign.distance = distance || tripAssign.distance;

    const updatedTripAssign = await tripAssign.save();
    res.json(updatedTripAssign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete tripAssign by ID
const deleteTripAssignById = async (req, res) => {
  try {
    const tripAssign = await TripAssignModel.findByIdAndDelete(req.params.id);
    if (!tripAssign) {
      return res.status(404).json({ message: 'TripAssign not found' });
    }
    res.json({ message: 'TripAssign deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete all tripAssigns
const deleteAllTripAssigns = async (req, res) => {
  try {
    await TripAssignModel.deleteMany();
    res.json({ message: 'All tripAssigns deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get past trips for a specific driver
const pastTrips = async (req, res) => {
  const { userName } = req.query;
  try {
    const currentDate = moment();
    const query = { date: { $lt: currentDate } }; // Filter for past trips

    // If userName is provided, add it to the query
    if (userName) {
      query.userName = userName;
    }

    const trips = await TripAssignModel.find(query);
    res.status(200).json(trips);
  } catch (error) {
    console.error('Error fetching past trips:', error);
    res.status(500).json({ message: 'Error fetching past trips' });
  }
};

// Get upcoming trips for a specific driver
const upcomingTrips = async (req, res) => {
  const { userName } = req.query;
  try {
    const currentDate = moment();
    const query = { date: { $gte: currentDate } }; // Filter for upcoming trips

    // If userName is provided, add it to the query
    if (userName) {
      query.userName = userName;
    }

    const trips = await TripAssignModel.find(query);
    res.status(200).json(trips);
  } catch (error) {
    console.error('Error fetching upcoming trips:', error);
    res.status(500).json({ message: 'Error fetching upcoming trips' });
  }
};


// Get total trips of today
const getTodayTripsCount = async (req, res) => {
  try {
    const startOfDay = moment().startOf('day');
    const endOfDay = moment().endOf('day');

    const todayTripsCount = await TripAssignModel.countDocuments({
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    res.status(200).json({ totalTripsToday: todayTripsCount });
  } catch (error) {
    console.error("Error fetching today's trips count: ", error);
    res.status(500).json({
      message: "Error fetching today's trips count" });
  };
};


// Mark trip as done
const markTripAsDone = async (req, res) => {
  try {
    const tripAssign = await TripAssignModel.findById(req.params.id);
    if (!tripAssign) {
      return res.status(404).json({ message: 'TripAssign not found' });
    }

    tripAssign.done = true; // Mark the trip as done
    const updatedTrip = await tripAssign.save();

    res.status(200).json({ message: 'Trip marked as done', trip: updatedTrip });
  } catch (error) {
    console.error('Error marking trip as done:', error);
    res.status(500).json({ message: 'Error marking trip as done' });
  }
};


module.exports = {
  getTripAssignById,
  getAllTripAssigns,
  createTripAssign,
  updateTripAssignById,
  deleteTripAssignById,
  deleteAllTripAssigns,
  pastTrips,
  upcomingTrips,
  getTodayTripsCount,
  markTripAsDone
};
