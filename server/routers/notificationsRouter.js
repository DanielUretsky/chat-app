const express = require('express');
const router = express.Router();

const notificationsController = require('../controllers/notificationsController');
const tokenMiddleware = require('../middlewares/tokenMiddleware');

router.get('/get-notifications', tokenMiddleware, notificationsController.getAllUserNotifications)
router.post('/send-notification', tokenMiddleware, notificationsController.sendNotification)
router.delete('/remove-notification', tokenMiddleware, notificationsController.removeNotification)

module.exports = router;