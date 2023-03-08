const { Category } = require('../../models');

const { addCategorySchema } = require('./schema');

const validateNewCategory = async (name) => {
  const { error } = addCategorySchema.validate({ name });
  if (error) return { type: 'INVALID_VALUE', message: error.message };
  
  const categoryExists = await Category.findOne({ where: { name } });
  if (categoryExists) return { type: 'CATEGORY_EXISTS', message: 'Category already registered' };
  
  return { type: null, message: '' };
};
module.exports = {
  validateNewCategory,
};