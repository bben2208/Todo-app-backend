const mongoose = require('mongoose');

// Use DATABASE_URL from .env
const uri = process.env.DATABASE_URL;

// Debug: Log the connection string to verify it's defined
console.log("DATABASE_URL:", uri);

if (!uri) {
  console.error("Missing DATABASE_URL environment variable");
  process.exit(1);
}

mongoose.connect(uri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

module.exports = mongoose.connection;
