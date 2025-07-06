// utils/generateToken.js
const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '15m', // Access token expires in 15 minutes
    });
};

module.exports = generateToken;