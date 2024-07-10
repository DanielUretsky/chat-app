const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

const tokenMiddleware = require('../middlewares/tokenMiddleware');

router.post('/contacts', tokenMiddleware, userController.searchUsers);
router.post('/update/:id', tokenMiddleware, userController.updateUser);
router.post('/upload-avatar', tokenMiddleware, userController.uploadAvatar);

module.exports = router;