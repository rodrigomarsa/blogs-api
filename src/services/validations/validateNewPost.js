const { Category } = require('../../models');
const { addPostSchema, updatePostSchema } = require('./schema');

const validateNewPost = async (title, content, categoryIds) => {
  const { error } = addPostSchema.validate({ title, content, categoryIds });
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  const post = await Promise.all(
    categoryIds.map(async (id) => Category.findOne({ where: { id } })),
  );
  if (post.some((categoryId) => categoryId === null)) {
    return { type: 'CATEGORY_NOT_FOUND', message: 'one or more "categoryIds" not found' };
  }

  return { type: null, message: '' };
};

const validateUpdatePost = async (title, content) => {
  const { error } = updatePostSchema.validate({ title, content });
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

module.exports = {
  validateNewPost,
  validateUpdatePost,
};