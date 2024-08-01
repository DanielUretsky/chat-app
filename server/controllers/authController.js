const authService = require('../services/authService');

const registration = async (req, res) => {
    try {
        const userData = req.body;
        if (!userData) res.status(500).send('Unknown server error');

        const response = await authService.registration(userData);
        if (!response) res.status(500).send('Unknown server error');

        res.status(response.status).send(response.message);
    } catch (err) {
        console.log('Err authController registration', err.message);
        res.status(500).send('Unknown server error');
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const response = await authService.login(email, password);
        if (!response) res.status(500).send('Unknown server error');
      
        res.status(response.status).send(response.message);
    } catch (err) {
        console.log('Err authController login', err.message);
        res.status(500).send('Unknown server error');
    }
}

const authenticate = async (req, res) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
      
        const response = await authService.authenticate(accessToken);
        if (!response) return res.status(500).send('Unknown server error');
       
        res.status(response.status).send(response.message);
    } catch (err) {
        console.log('Err authController authenticate', err.message);
        if(err.name === "TokenExpiredError") return {status: 401, message: "Unauthorized!"}
    }
}


module.exports = {
    registration,
    login,
    authenticate
}
