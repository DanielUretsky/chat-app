const notificationsModel = require('../models/notificationsModel');

const getAllUserNotifications = async (userId) => {
    try {
        const notifications = await notificationsModel
            .find({ user: userId })
            .populate({
                path: 'sender',
                select: '_id username'
            });

        return { status: 200, message: notifications };
    } catch (err) {
        console.log('Err in notifications controller, getAllUserNotifications', err);

    }
}

const sendNotification = async (notificationType, dateSend, timeSend, chatId, sender, user) => {
    try {
        
        const foundedNotification = await notificationsModel.findOne({
            $or: [
                { chatId, sender: sender, user: user },
                { chatId, sender: user, user: sender}
            ]
        });
        if (foundedNotification) {
            return {
                status: 409,
                message: 'This notification has already been sent previously'
            };
        }

        const newNotification = new notificationsModel({ notificationType, dateSend, timeSend, chatId, sender, user });

        await newNotification.save();

        return {
            status: 201,
            message: 'Notification send succesfully'
        };

    } catch (err) {
        console.log('Err in notifications controller sendNotification', err);

    }
}

const removeNotification = async (notificationId, userId) => {
    try {
        console.log(notificationId);

        await notificationsModel.findByIdAndDelete(notificationId);

        //destructure array from getAllUserNotifications
        const { message: notifications } = await getAllUserNotifications(userId);
        return { status: 200, message: notifications }
    } catch (err) {
        console.log('Err in notifications controller removeNotification', err);
    }
}

module.exports = {
    getAllUserNotifications,
    sendNotification,
    removeNotification
}