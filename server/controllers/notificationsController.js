const notificationsService = require('../services/notificationsService');

const getAllUserNotifications = async (req, res) => {
    try {
        const userId = req.user._id;
        const response = await notificationsService.getAllUserNotifications(userId);
      
        res.status(response.status).send(response.message);
    } catch (err) {
        console.log('Err in notifications controller, getAllUserNotifications', err);

    }
}

const sendNotification = async (req, res) => {
    try {
        const {notificationType, dateSend, timeSend, chatId, sender, user} = req.body.notificationData;
        const response = await notificationsService.sendNotification(notificationType, dateSend, timeSend, chatId, sender, user);

        res.status(response.status).send(response.message);
    } catch (err) {
        console.log('Err in notifications controller sendNotification', err);

    }
}

const removeNotification = async (req, res) => {
    try {
        const {notificationId} = req.body;
        const userId = req.user._id
        const response = await notificationsService.removeNotification(notificationId, userId);

        res.status(response.status).send(response.message);
    } catch (err) {
        console.log('Err in notifications controller removeNotification', err);

    }
}


module.exports = {
    getAllUserNotifications,
    sendNotification,
    removeNotification
}