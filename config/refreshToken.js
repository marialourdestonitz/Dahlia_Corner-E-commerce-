const jwt = require('jsonwebtoken');

const generateRereshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

module.exports = { generateRereshToken };