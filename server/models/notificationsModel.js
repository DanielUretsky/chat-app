const mongoose = require('mongoose');

const notificationsSchema = new mongoose.Schema({
    notificationType: {
        type: String
    },
    dateSend: {
        type: String
    },
    timeSend: {
        type: String
    },
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, {
    versionKey: false,
    strict: true
});


const Notification = mongoose.model("notification", notificationsSchema, "notifications");

module.exports = Notification; 