const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')

router.post('/register', authController.registerUser);
router.get('/me', authController.me);

module.exports = router;