const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event')

router.get('/', eventController.getEvents);
router.get('/:eventId', eventController.getEventById);
router.post('/', eventController.createEvent);
router.put('/:eventId', eventController.modifyEvent);
router.post("/:eventId/members/add", eventController.addMembers);
router.delete("/:eventId/members/delete", eventController.deleteMembers);
router.delete('/:eventId', eventController.deleteEvent);

module.exports = router;
