const mongoose = require('mongoose');
const chatModel = require('../models/chatModel');

const createChat = async (senderId, recieverId) => {
    try {
        const foundedChat = await chatModel.findOne({
            $or: [
                { members: [senderId, recieverId] },
                { members: [recieverId, senderId] }
            ]
        });

        if (foundedChat) return { status: 409, message: 'This chat is already exists!' };

        const userObjectId = new mongoose.Types.ObjectId(senderId);
        const newChat = new chatModel({ members: [senderId, recieverId] })

        await newChat.save();

        await newChat.populate({
            path: 'members',
            match: { _id: { $ne: userObjectId } },
            select: 'username email image'
        });

        return { status: 201, message: newChat };
    } catch (err) {
        console.log(`Error chatServices createChat ${err.message}`);
    }
};

const getAllChats = async (userId) => {
    try {
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const userChats = await chatModel
            .find({ members: { $in: [userObjectId] } })
            .populate({ //fill user data instead of id
                path: 'members', //find chats where userId inside members array
                match: { _id: { $ne: userObjectId } }, //do not fill with user data this user id 
                select: 'firstName lastName username email gender phone image' //select fields
            });

        return { status: 200, message: userChats }
    } catch (err) {
        console.log('Err chatService getAllChats', err.message);
        return { status: 500, message: "Unknown server error" };
    }
};

const getAllDeletedChats = async (userId) => {
    try {
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const deletedChats = await chatModel
            .find({
                $and: [
                    { members: { $in: [userObjectId] } },
                    {
                        $or: [
                            { 'deletedFor': userId },
                            { 'deletedFor': 'all' }
                        ]
                    }
                ]
            })
            .select('_id deletedFor members')
            .populate({
                path: 'members',
                match: { _id: { $ne: userObjectId } },
                select: '_id username email image'

            })


        return { status: 200, message: deletedChats }

    } catch (err) {
        console.log(`Error in chatService, getAllDeletedChats:`, err.message);
    }
}


const deleteChat = async (_id, deletedFor) => {
    try {
        await chatModel.findByIdAndUpdate(_id,
            { $set: { deletedFor } },
            { new: true }
        );

        return { status: 200, message: 'Chat deleted succesfully!' }
    } catch (err) {
        console.log('Err chatService deleteChat', err.message);
        return { status: 500, message: "Unknown server error" };
    }
}

const restoreChat = async (chatID, userId) => {
    try {
        await chatModel.findByIdAndUpdate(chatID,
            { $set: { deletedFor: null } },
            { new: true }
        );

        //destructuring array from getAllDeletedChats
        const { message: deletedChats } = await getAllDeletedChats(userId);
        console.log(deletedChats);
        return { status: 200, message: deletedChats }
    } catch (err) {
        console.log(`Error in chat chatService, restoreChat:`, err.message);
    }
} 

const getMessages = async (chatID) => {
    try {
        const { messages } = await chatModel.findById(chatID);
        return { status: 200, message: messages }
    } catch (err) {
        console.log('Err chatService getMessages', err.message);
        return { status: 500, message: "Unknown server error" };
    }
};

const sendMessage = async (_id, roomID, text, images, timeSend) => {
    try {
        const message = {
            sender: _id,
            body: {
                text,
                images,
                timeSend
            }
        }

        await chatModel.findOneAndUpdate(
            { _id: roomID },
            { $push: { messages: message } },
            { new: true, useFindAndModify: false }
        );

        return { status: 200, message: "succes" }
    } catch (err) {
        console.log('Err chatService sendMessage', err.message);
        return { status: 500, message: "Unknown server error" };
    }

};

const editMessage = async (messageId, roomId, text) => {
    try {
        const chat = await chatModel.findOneAndUpdate(
            { _id: roomId, 'messages._id': messageId },
            { $set: { 'messages.$.body.text': text } },
            { new: true }
        )

        if (!chat) return { status: 404, message: 'Message not found!' };
        return { status: 200, message: chat.messages };
    } catch (err) {
        console.log('Err chatService editMessage', err.message);
    }
}

const deleteMessage = async (messageId, roomId, deletedFor) => {
    try {
        await chatModel.findOneAndUpdate(
            { _id: roomId, messages: { $elemMatch: { _id: messageId } } },
            {
                $set: deletedFor === 'sender' ?
                    { 'messages.$.body.deletedForSender': true } :
                    { 'messages.$.body.deletedForEveryone': true }
            }
        );
        return { status: 200, message: 'Message deleted succesfully!' }
    } catch (err) {
        console.log('Err chatService deleteMessage', err.message);
    }
}


module.exports = {
    createChat,
    getAllChats,
    getAllDeletedChats,
    deleteChat,
    restoreChat,
    getMessages,
    sendMessage,
    editMessage,
    deleteMessage,

}  