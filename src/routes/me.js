const express = require('express');
const router = express.Router();
const meController = require('../controllers/me');

router.get('/events', meController.getEvents);
router.get('/groups', meController.getGroups);
router.get('/', meController.getMe);

module.exports = router;