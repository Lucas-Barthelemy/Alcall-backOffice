const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

const authMiddleware = require('./middlewares/auth')

const eventRoutes = require('./routes/event');
const authRoutes = require('./routes/auth');
const connectionMongoDB = require('./mongo/connection');

const app = express();


connectionMongoDB()

app.use(cors());
app.use(bodyParser.json())

app.use('/api/auth', authMiddleware, authRoutes);
app.use('/api/events', authMiddleware, eventRoutes);

module.exports = app;
