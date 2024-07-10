const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    deletedFor: {
        type: String,
        default: null,
    },
    messages:
        [
            {
                sender: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
                body: {
                    text: {
                        type: String,
                        required: true
                    },
                    images: {
                        type: [],
                        default: null
                    },
                    deletedForSender: {
                        type: Boolean,
                        default: false,
                    },
                    deletedForEveryone: {
                        type: Boolean, 
                        default: false
                    },
                    timeSend: {
                        type: mongoose.Schema.Types.Mixed,
                        required: true
                    }
                }
            }
        ],
}, {
    versionKey: false,
    strict: true
});
//default for messages
chatSchema.path('messages').default(() => []);

const Chat = mongoose.model("chat", chatSchema, "chats");

module.exports = Chat; 