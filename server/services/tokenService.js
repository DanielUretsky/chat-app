const jwt = require('jsonwebtoken')

const generateAccessToken = (payload) => {
    try {
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        return accessToken;
    } catch (err) {
        console.log('Err tokenService generateTokens', err.message);
    }
};

const validateAccessToken = (accessToken) => {
    try {
        const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const { iat, exp, ...newPayload } = payload;
       
        if (!newPayload) return null;
        return newPayload;
    } catch (err) {
        console.log('Err tokenService validateAccessToken', err.message);
        return null;
    }
};


module.exports = {
    generateAccessToken,
    validateAccessToken,
}