const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/registration', authController.registration);
router.post('/login', authController.login);
router.get('/authenticate', authController.authenticate);

module.exports = router; 