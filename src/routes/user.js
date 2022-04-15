const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/:userEmail', userController.getUserByEmail);
router.get('/group/:groupId', userController.getUsersGroup);

module.exports = router;