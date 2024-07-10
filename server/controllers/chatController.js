const chatServices = require('../services/chatServices');

const createChat = async (req, res) => {
    const { senderId, receiverId } = req.params;
    try {
        const response = await chatServices.createChat(senderId, receiverId);
        if (!response) res.status(500).send('Unknown server Error');

        res.status(response.status).send(response.message);
    } catch (err) {
        console.log(`Error in chat controller, createChat:`, err.message);
        res.status(500).send('Unknown server Error');
    }
};

const getAllChats = async (req, res) => {
    try {
        const userId = req.user._id;
        const response = await chatServices.getAllChats(userId);

        res.status(response.status).send(response.message);
    } catch (err) {
        console.log(`Error in chat controller, getAllChats:`, err.message);

    }
};

const deleteChat = async (req, res) => {
    try {
        const {_id, deletedFor} = req.body.chatData;
        const response = await chatServices.deleteChat(_id, deletedFor);

        res.status(response.status).send(response.message);
    } catch (err) {
        console.log(`Error in chat controller, deleteChat:`, err.message);
    }
}

const getMessages = async (req, res) => {
    try {
        const { chatID } = req.params;
        const response = await chatServices.getMessages(chatID);
        if (!response) res.status(500).send('Unknown server error');

        res.status(response.status).send(response.message);
    } catch (err) {
        console.log(`Error in chat controller, getMessages:`, err.message);
    }
};

const sendMessage = async (req, res) => {
    try {
        const { _id, roomID, text, images, timeSend } = req.body.message;
        const response = await chatServices.sendMessage(_id, roomID, text, images, timeSend);
        res.status(response.status).send(response.message);
    } catch (err) {
        console.log(`Error in chat controller, sendMessage:`, err.message);
    }
};

const editMessage = async (req, res) => {
    try {
        const { messageId, roomId, text } = req.body.editedMessageData;
        const response = await chatServices.editMessage(messageId, roomId, text);

        res.status(response.status).send(response.message);
    } catch (err) {
        console.log(`Error in chat controller, editMessage:`, err.message);
    }
}

const deleteMessage = async (req, res) => {
    try {
        const {messageId, roomId, deletedFor} = req.body.deletedMessage; 
        const response = await chatServices.deleteMessage(messageId, roomId, deletedFor);
        
        res.status(response.status).send(response.message);
    } catch (err) {
        console.log(`Error in chat controller, deleteMessage:`, err.message);
    }
}

module.exports = {
    createChat,
    getAllChats,
    deleteChat,
    getMessages,
    sendMessage,
    editMessage,
    deleteMessage
}