const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const tokenService = require('./tokenService');

const registration = async (userData) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = userData.password ? await bcrypt.hash(userData.password, salt) : null;

        const newUser = new userModel({ ...userData, password: hashedPassword });
        if (!newUser) return { status: 500, message: 'Unknown server error' };

        await newUser.save();
        return { status: 201, message: 'Created succesfully!' };
    } catch (err) {
        console.log('Err authService registration', err.message);
        if (err.name === 'ValidationError') return { status: 422, message: err.message };
        if (err.name == 'MongoServerError' && err.code === 11000) {
            return {
                status: 409,
                message: `User with ${err.keyPattern.username ? `username ${userData.username}` : `email ${userData.email}`} is already exist!`
            };
        };
    }
}

const login = async (userEmail, userPassword) => {
    try {
        const user = await userModel.findOne({ email: userEmail });
        if (!user) return { status: 404, message: 'Unknown email or password!' };

        const decodedPassword = await bcrypt.compare(userPassword, user.password);
        if (!decodedPassword) return { status: 404, message: 'Unknown email or password!' };

        const { password, ...userDto } = user._doc;

        const accessToken = tokenService.generateAccessToken(userDto);
        if (!accessToken) return { status: 500, message: 'Unknown server error' };

        return {
            status: 200,
            message: {
                text: 'Logged in!',
                data: { user: { ...userDto }, accessToken }
            }
        }
    } catch (err) {
        console.log('Err authService login', err.message);
        return { status: 500, message: 'Unknown server error' };
    }
}

// const logout = async (refreshToken) => {
//     try {
//         const removedRefreshToken = await tokenService.removeRefreshToken(refreshToken);
//         if (!removedRefreshToken) return { status: 500, message: 'Unknown server error' };

//         return { status: 200, message: 'Logged out!' };
//     } catch (err) {
//         console.log('Err authService logout', err.message);
//         return { status: 500, message: 'Unknown server error' }
//     }
// }

const authenticate = async (accessToken) => {
    try {
       
        if(!accessToken) return { status: 401, message: 'Unauthorized!' };
        const response = tokenService.validateAccessToken(accessToken);
        if(!response) return {status: 401, message: "Unauthorized!"}

        const user = await userModel.findById(response._id);
        const {password, ...userDto} = user._doc;
        return  {status: 200, message: userDto};
    } catch (err) {
        console.log('Err authService authenticate', err.message);
        if(err.name === "TokenExpiredError") return {status: 401, message: "Unauthorized!"}
    }
}

module.exports = {
    login,
    registration,
   // logout,
    authenticate 
} 