// config/database.js
const mongoose = require('mongoose');

console.log("MONGO_URL:", process.env.MONGO_URL); // Debug: Check that it's loaded

const uri = process.env.MONGO_URL;

if (!uri) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

mongoose.connect(uri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

module.exports = mongoose.connection;
