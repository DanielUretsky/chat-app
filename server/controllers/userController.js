const userService = require('../services/userService');
const searchUsers = async (req, res) => {
    try {
        const { email } = req.body;
        const response = await userService.searchUsers(email);
        if (!response) res.status(500).send('Unknown server error');

        res.status(response.status).send(response.message);
    } catch (err) {
        console.log('Err userController searchUsers:', err.message);
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUserData = req.body;

        const response = await userService.updateUser(id, updatedUserData);
        if (!response) res.status(500).send('Unknown server error');

        res.status(response.status).send(response.message);
    } catch (err) {
        console.log('Err userController updateUser:', err.message);
    }
}


const uploadAvatar = async (req, res) => {
    try {
        const {src: avatar} = req.body.userAvatar;
        const { _id: id } = req.user;

        const response = await userService.uploadAvatar(id, avatar);
        res.status(response.status).send(response.message);
    } catch (err) {
        console.log('Err userController uploadAvatar:', err.message);
    }
}

module.exports = {
    searchUsers,
    updateUser,
    uploadAvatar 
} 