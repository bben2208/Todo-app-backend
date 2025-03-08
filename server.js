require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const app = express();

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Parse JSON data
app.use(methodOverride('_method'));

// Database connection
const db = require('./config/database');

// Routes
const homeRoutes = require('./routes/home');
const todosRoutes = require('./routes/todos');
const notesRoutes = require('./routes/notes'); // Added notes route
const usersRoutes = require('./routes/users'); // Import users routes

app.use('/', homeRoutes);
app.use('/todos', todosRoutes);
app.use('/notes', notesRoutes); 
app.use('/users', usersRoutes); 

// Removed temporary /users endpoint that was returning an empty array
// app.get('/users', (req, res) => {
//     res.json([]); // <-- Always returns an empty array!
// });

// Server listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
