require('dotenv').config(); // Ensure environment variables are loaded

const mongoose = require('mongoose');

// Debugging: Check if MONGO_URL is defined
console.log("MONGO_URL:", process.env.MONGO_URL);

const uri = process.env.MONGO_URL;

if (!uri) {
  console.error("❌ Missing MONGO_URL environment variable");
  process.exit(1); // Stop the app if the URI is missing
}

mongoose.connect(uri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

module.exports = mongoose.connection;
