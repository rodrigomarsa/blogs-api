const { Category } = require('../models');
const { validateNewCategory } = require('./validations/validateNewCategory');

const createCategory = async ({ name }) => {
  const error = await validateNewCategory(name);
  if (error.type) return error;
  
  const newCategory = await Category.create({ name });

  return { type: null, message: newCategory };
};

const getCategories = async () => {
  const categories = await Category.findAll();

  return { type: null, message: categories };
};

module.exports = {
  createCategory,
  getCategories,
};
