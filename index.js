const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const carRoutes = require('./routes/carRoutes');
const driverRoutes = require('./routes/driverRoute');
const tripAssignRoutes = require('./routes/tripAssignRoute');
const locationDataRoutes = require('./routes/locationDatasRoute');

const app = express();
const PORT = 5000;
const MONGO_URI = 'mongodb+srv://aronacosta173:QK8yqNDyQlCdVJ2k@cluster0.rgn5c.mongodb.net/ar33?retryWrites=true&w=majority&appName=Cluster0';

// Improved CORS setup with dynamic origins
const allowedOrigins = ['https://driver-panel.vercel.app/', 'https://manager-panel-main.vercel.app/'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Support for cookies
}));

// Middleware
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use('/api/cars', carRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/tripAssign', tripAssignRoutes);
app.use('/api/locationDatas', locationDataRoutes);
// app.use('/api/driversAuth', driverAuthRoutes); // Uncomment if needed

// MongoDB Connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on https://backendserver-4urp.onrender.com:${PORT}`);
});
