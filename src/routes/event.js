const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event')


router.get('/', eventController.getEvents);
router.get('/:eventId', eventController.getEventById);
router.post('/', eventController.createEvent);
router.put('/:eventId', eventController.modifyEvent);
router.delete('/:eventId', eventController.deleteEvent);
router.post("/:eventId/addMembers", eventController.addMembers)
router.delete("/:eventId/deleteMembers", eventController.deleteMembers)

module.exports = router;