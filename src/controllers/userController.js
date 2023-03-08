const { UserService } = require('../services');
const { createToken } = require('../auth/authFunctions');
const { mapError } = require('../utils/mapError');

const getByUserId = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await UserService.getByUserId(id);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const { type, message } = await UserService.createUser({ displayName, email, password, image });

  if (type) return res.status(mapError(type)).json({ message });

  const token = createToken({ email });
    
  return res.status(201).json({ token });
};

module.exports = {
  createUser,
  getByUserId,
};
