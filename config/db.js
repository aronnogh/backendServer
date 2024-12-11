// // server/config/db.js
// const mongoose = require('mongoose');

// const mongoURI = 'mongodb+srv://aronacosta173:QK8yqNDyQlCdVJ2k@cluster0.rgn5c.mongodb.net/cardataforFinal?retryWrites=true&w=majority&appName=Cluster0';


// const connectDB = async () => {
//   try {
//     await mongoose.connect(mongoURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//       useFindAndModify: false
//     });
//     console.log('MongoDB Connected...');
//   } catch (err) {
//     console.error(err.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
