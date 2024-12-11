const mongoose = require('mongoose');

const tripAssignSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  driverName: { 
    type: String, 
    required: true, 
    trim: true, 
  },
  startLocation: { 
    type: String, 
    required: true, 
    trim: true, 
  },
  done: {
    type: Boolean, // Boolean to represent if the trip is completed or not
    default: null, // Null by default
  },
  endLocation: { 
    type: String, 
    required: true, 
    trim: true, 
  },
  date: { 
    type: Date, 
    required: true,
  },
  time: { 
    type: String, 
    required: true, 
    match: /^([01]\d|2[0-3]):?([0-5]\d)$/, 
  },
  distance: { 
    type: Number, 
    required: true, 
    min: 0, 
  },
}, { 
  timestamps: true,
});

const TripAssignModel = mongoose.models.TripAssign || mongoose.model('TripAssign', tripAssignSchema);

module.exports = TripAssignModel;
