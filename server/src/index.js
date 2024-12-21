require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const connectDB = require('./db/db');
const { syncModels } = require('./db/sequelize');

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


// Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});


// Connect to database
connectDB();

const server = app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await syncModels();
});


module.exports = { app, server };