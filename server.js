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
app.use(methodOverride('_method'));

// Database connection
const db = require('./config/database');

// Routes
const homeRoutes = require('./routes/home');
const todosRoutes = require('./routes/todos');
const notesRoutes = require('./routes/notes'); // Added notes route

app.use('/', homeRoutes);
app.use('/todos', todosRoutes);
app.use('/notes', notesRoutes); // New route for notes

app.get('/users', (req, res) => {
    res.json([]); // Temporary fix: send an empty array
});

// Server listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
