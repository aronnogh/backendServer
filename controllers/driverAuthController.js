// const DriverAuth = require("../models/driverAuth"); // Import the DriverAuth model

// // Register a new driver
// const registerDriver = async (req, res) => {
//   const { username, password } = req.body;


//   try {
//     // Check if username already exists
//     const existingDriver = await DriverAuth.findOne({ username });
//     if (existingDriver) {
//       return res.status(400).json({ message: "Username already exists" });
//     }

//     // Create a new driver
//     const driver = new DriverAuth({ username, password });
//     await driver.save();
//     res.status(201).json({ message: "Driver registered successfully", driver });
//   } catch (error) {
//     res.status(500).json({ message: "Error registering driver", error });
//   }
// };

// // Login a driver
// const loginDriver = async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     // Check if the username exists and password matches
//     const driver = await DriverAuth.findOne({ username });
//     if (driver && driver.password  password) {
//       res.status(200).json({ message: "Login successful", driver });
//     } else {
//       res.status(401).json({ message: "Invalid username or password" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error during login", error });
//   }
// };

// // Get all drivers
// const getAllDrivers = async (req, res) => {
//   try {
//     const drivers = await DriverAuth.find();
//     res.status(200).json({ message: "Drivers fetched successfully", drivers });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching drivers", error });
//   }
// };

// // Get a single driver by ID
// const getDriverById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const driver = await DriverAuth.findById(id);
//     if (driver) {
//       res.status(200).json({ message: "Driver fetched successfully", driver });
//     } else {
//       res.status(404).json({ message: "Driver not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching driver", error });
//   }
// };

// // Update a driver by ID
// const updateDriverById = async (req, res) => {
//   const { id } = req.params;
//   const { username, password } = req.body;

//   try {
//     const updatedDriver = await DriverAuth.findByIdAndUpdate(
//       id,
//       { username, password },
//       { new: true }
//     );

//     if (updatedDriver) {
//       res.status(200).json({ message: "Driver updated successfully", updatedDriver });
//     } else {
//       res.status(404).json({ message: "Driver not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error updating driver", error });
//   }
// };

// // Delete a driver by ID
// const deleteDriverById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deletedDriver = await DriverAuth.findByIdAndDelete(id);

//     if (deletedDriver) {
//       res.status(200).json({ message: "Driver deleted successfully", deletedDriver });
//     } else {
//       res.status(404).json({ message: "Driver not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting driver", error });
//   }
// };

// // Delete all drivers
// const deleteAllDrivers = async (req, res) => {
//   try {
//     await DriverAuth.deleteMany();
//     res.status(200).json({ message: "All drivers deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting drivers", error });
//   }
// };

// // Export all controller functions
// module.exports = {
//   registerDriver,
//   loginDriver,
//   getDriverById,
//   getAllDrivers,
//   updateDriverById,
//   deleteDriverById,
//   deleteAllDrivers,
// };
