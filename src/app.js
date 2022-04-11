const express = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      authMiddleware = require('./middlewares/auth'),
      eventRoutes = require('./routes/event'),
      authRoutes = require('./routes/auth'),
      myRoutes = require('./routes/me'),
      connectionMongoDB = require('./mongoDB/connection'),
      app = express(),
      swaggerJsdoc = require("swagger-jsdoc"),
      swaggerUi = require("swagger-ui-express"),
      swaggerDoc = require("./docs/swagger");

connectionMongoDB()

app.use(cors());
app.use(bodyParser.json())

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerDoc)));
app.use('/api/auth', authMiddleware, authRoutes);
app.use('/api/events', authMiddleware, eventRoutes);
app.use('/api/me', authMiddleware, myRoutes)

module.exports = app;