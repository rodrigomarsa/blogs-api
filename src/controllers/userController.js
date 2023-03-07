const { UserService } = require('../services');
const { createToken } = require('../auth/authFunctions');
const { mapError } = require('../utils/mapError');

const createUser = async (req, res) => {
    const { displayName, email, password, image } = req.body;
    const { type, message } = await UserService.createUser({ displayName, email, password, image });

    if (type) return res.status(mapError(type)).json({ message });

    const token = createToken({ email });
    
    res.status(201).json({ token });
};

module.exports = {
  createUser,
};
