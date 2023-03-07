const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const JWT_CONFIG = {
  algorithm: 'HS256',
};

const createToken = (data) => jwt.sign({ data }, secret, JWT_CONFIG);

module.exports = { createToken };