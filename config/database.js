const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("Missing MONGO_URI environment variable");
  process.exit(1); // Exit if not set
}

mongoose.connect(uri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

module.exports = mongoose.connection;
