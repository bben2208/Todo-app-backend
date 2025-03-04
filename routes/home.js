const express = require('express');
const router = express.Router();

// Temporary data (replace with database query later)
const users = [
    { name: "John Doe", email: "john@example.com", age: 25 },
    { name: "Jane Doe", email: "jane@example.com", age: 30 }
];

router.get('/', (req, res) => {
    res.render('index', { users }); // Pass `users` to EJS
});

module.exports = router;
