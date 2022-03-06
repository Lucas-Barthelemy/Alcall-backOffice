const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event')

/**
 * @swagger
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/', eventController.getEvents);
router.get('/:eventId', eventController.getEventById);
router.post('/', eventController.createEvent);
router.put('/:eventId', eventController.modifyEvent);
router.delete('/:eventId', eventController.deleteEvent);

module.exports = router;