const jwt = require('jsonwebtoken');
require('dotenv').config();

const getToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

const setToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};

exports.getToken = getToken;
exports.setToken = setToken;
