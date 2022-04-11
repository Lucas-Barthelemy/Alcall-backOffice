const express = require('express');
const router = express.Router();
const meController = require('../controllers/me')


router.get('/events', meController.getEvents);

module.exports = router;