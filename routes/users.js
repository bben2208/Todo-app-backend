const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import User model

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from MongoDB
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// POST (Create) a new user
router.post('/', async (req, res) => {
  try {
    console.log("Received data:", req.body); // Debugging

    const { name, email, age } = req.body;

    // Validate input
    if (!name || !email || !age) {
      return res.status(400).json({ message: "All fields (name, email, age) are required" });
    }

    const newUser = new User({ name, email, age });
    await newUser.save();

    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).json({ message: "Error adding user", error: err.message });
  }
});

// PUT (Update) user
router.put('/:id', async (req, res) => {
  try {
    console.log("Update data:", req.body); // Debugging

    const { name, email, age } = req.body;

    if (!name || !email || !age) {
      return res.status(400).json({ message: "All fields are required for update" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, age },
      { new: true, runValidators: true } // Return updated user & validate
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Error updating user", error: err.message });
  }
});

// DELETE user
router.delete('/:id', async (req, res) => {
  try {
    console.log("Deleting user with ID:", req.params.id); // Debugging

    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully", user: deletedUser });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Error deleting user", error: err.message });
  }
});

module.exports = router;
