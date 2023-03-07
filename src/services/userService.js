const { User } = require('../models');
const { validateNewUser } = require('./validations/validateNewUser');

const createUser = async ({ displayName, email, password, image }) => {
  const error = await validateNewUser(displayName, email, password);
  if (error.type) return error;
  
  const newUser = await User.create({ displayName, email, password, image });

  return { type: null, message: newUser };
};

const getUsers = () => User.findAll();

const getByEmail = (email) => User.findOne({ where: { email } });

const getByUserId = (userId) => User.findByPk(userId);

module.exports = {
  createUser,
  getUsers,
  getByEmail,
  getByUserId,
};
