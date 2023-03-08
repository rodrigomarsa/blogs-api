const { User } = require('../models');
const { validateNewUser } = require('./validations/validateNewUser');

const createUser = async ({ displayName, email, password, image }) => {
  const error = await validateNewUser(displayName, email, password);
  if (error.type) return error;
  
  const newUser = await User.create({ displayName, email, password, image });

  return { type: null, message: newUser };
};

const getUsers = () => User.findAll();

const getByEmail = async (email) => User.findOne({ where: { email } });

const getByUserId = async (userId) => {
  const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } });
  if (!user) return { type: 'USER_NOT_EXIST', message: 'User does not exist' };
  
  return { type: null, message: user };
};

module.exports = {
  createUser,
  getUsers,
  getByEmail,
  getByUserId,
};
