const userModel = require('../models/userModel');

const searchUsers = async (email) => {
    try {
        const users = await userModel.find({ email: new RegExp(email) });
        return { status: 200, message: users };
    } catch (err) {
        console.log('Err userService searchUsers', err.message);
        return { status: 500, message: 'Unknown server Error' };
    }
}

const updateUser = async (id, updatedData) => {
    try {
        console.log(updatedData);
        const user = await userModel.findByIdAndUpdate(id,
            updatedData,
            { new: true }
        );
        return { status: 200, message: user };
    } catch (err) {
        console.log('Err userService updateUser', err.message);
        return { status: 500, message: 'Unknown server Error' };
    }
}


const uploadAvatar = async (id, avatar) => {
    try {
       
        const user = await userModel.findByIdAndUpdate(id,
            { image: avatar },
            { new: true }
        );

        const { password, ...userDto} = user._doc;
    
        return {status: 200, message: userDto};
    } catch (err) {
        console.log('Err userService uploadAvatar', err.message);
    }
}
module.exports = {
    searchUsers,
    updateUser,
    uploadAvatar
} 