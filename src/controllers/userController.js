const { UserService } = require('../services');
const { createToken } = require('../auth/authFunctions');
const { mapError } = require('../utils/mapError');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const { type, message } = await UserService.createUser({ displayName, email, password, image });

  if (type) return res.status(mapError(type)).json({ message });

  const token = createToken({ email });
    
  return res.status(201).json({ token });
};

const getByUserId = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await UserService.getByUserId(id);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

const getUsers = async (_req, res) => {
  const { type, message } = await UserService.getUsers();

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

const deleteUser = async (req, res) => {
  const user = req.data;

  const { type, message } = await UserService.deleteUser(user);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(204).end();
};

module.exports = {
  createUser,
  getByUserId,
  getUsers,
  deleteUser,
};
