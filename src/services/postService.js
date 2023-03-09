const { User, BlogPost, PostCategory } = require('../models');
const { validateNewPost } = require('./validations/validateNewPost');

const createPost = async (newPost, email) => {
  const { title, content, categoryIds } = newPost;
  const error = await validateNewPost(title, content, categoryIds);
  if (error.type) return error;

  const user = await User.findOne({ where: { email } });
  await BlogPost.create({ title, content, userId: user.dataValues.id });

  const createdPost = await BlogPost.findAll({ order: [['id', 'DESC']], limit: 1 });

  await Promise.all(categoryIds
    .map(async (categoryId) => PostCategory.create({
      postId: createdPost[0].dataValues.id, categoryId })));
  
  return { type: null, message: createdPost[0] };
};

const getPosts = async () => {
  const posts = await BlogPost.findAll();

  return { type: null, message: posts };
};

module.exports = {
  createPost,
  getPosts,
};
