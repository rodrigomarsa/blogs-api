const { User } = require('../../models');

const { addUserSchema } = require('./schema');

const validateNewUser = async (displayName, email, password) => {
  const { error } = addUserSchema.validate({ displayName, email, password });
  if (error) return { type: 'INVALID_VALUE', message: error.message };
  
  const userExists = await User.findOne({ where: { email } });
  if (userExists) return { type: 'USER_EXISTS', message: 'User already registered' };
  
  return { type: null, message: '' };
};
module.exports = {
  validateNewUser,
};