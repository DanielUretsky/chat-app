const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

const tokenMiddleware = require('../middlewares/tokenMiddleware');

//---- CHATS ----
router.get('/get-chats', tokenMiddleware, chatController.getAllChats);
router.get('/get-deleted-chats', tokenMiddleware, chatController.getAllDeletedChats);

router.post('/create-chat/:senderId/:receiverId', tokenMiddleware, chatController.createChat);
router.post('/delete-chat', tokenMiddleware, chatController.deleteChat);
router.post('/restore-chat/:chatID', tokenMiddleware, chatController.restoreChat);

//---- MESSAGES ----
router.get('/get-messages/:chatID', tokenMiddleware, chatController.getMessages);

router.post('/send-message/', tokenMiddleware, chatController.sendMessage);
router.post('/edit-message', tokenMiddleware, chatController.editMessage);
router.post('/delete-message', tokenMiddleware, chatController.deleteMessage);

module.exports = router; 