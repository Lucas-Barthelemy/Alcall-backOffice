const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authMiddleware = require('./middlewares/auth')

const eventRoutes = require('./routes/event');
const authRoutes = require('./routes/auth')

mongoose.connect(
    "mongodb+srv://pierre:pierre@cluster0.ikion.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((e) => console.log(e));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json())

app.use('/api/auth', authMiddleware, authRoutes);
app.use('/api/events', authMiddleware, eventRoutes);

module.exports = app;
