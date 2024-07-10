const tokenService = require('../services/tokenService');
const tokenMiddleware = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader) res.status(401).send('Unauthorized!');

        const token = authorizationHeader.split(' ')[1];
        if(!token) res.status(401).send('Unauthorized!');

        const userData = tokenService.validateAccessToken(token);
        if(!userData) res.status(401).send('Unauthorized!');

        req.user = userData;
        next();
    } catch (err) { 
        console.log('Err tokenMiddleware', err.message);
        res.status(401).send('Unauthorized!');
    }
}

module.exports = tokenMiddleware;