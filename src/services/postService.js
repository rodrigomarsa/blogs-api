const { Op } = require('sequelize');
const { User, Category, BlogPost, PostCategory } = require('../models');
const { validateNewPost, validateUpdatePost } = require('./validations/validateNewPost');

const createPost = async (newPost, userId) => {
  const { title, content, categoryIds } = newPost;
  const error = await validateNewPost(title, content, categoryIds);
  if (error.type) return error;

  const newBlogPost = await BlogPost.create({ title, content, userId });

  const createdPost = await BlogPost.findAll({ order: [['id', 'DESC']], limit: 1 });

  await Promise.all(categoryIds
    .map(async (categoryId) => PostCategory.create({
      postId: newBlogPost.id, categoryId })));
  
  return { type: null, message: createdPost[0] };
};

const getPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return { type: null, message: posts };
};

const searchPost = async (q) => {
  const postsFiltered = await BlogPost.findAll({ where: {
    [Op.or]: [
    { title: { [Op.like]: `%${q}%` } },
    { content: { [Op.like]: `%${q}%` } },
  ] },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!postsFiltered) return { message: [] };

  return { message: postsFiltered };
};

const getByPostId = async (postId) => {
  const post = await BlogPost.findByPk(postId, {
    include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ] });
  if (!post) return { type: 'POST_NOT_EXIST', message: 'Post does not exist' };
  
  return { type: null, message: post };
};

const updateByPostId = async (userId, postId, postToUpdate) => {
  const { title, content } = postToUpdate;
  
  const error = await validateUpdatePost(title, content);
  if (error.type) return error;

  const user = await User.findOne({ where: { id: userId } });
  const post = await BlogPost.findByPk(postId);
  if (user.id !== post.userId) return { type: 'UNAUTHORIZED_USER', message: 'Unauthorized user' };

  await BlogPost.update({ title, content }, { where: { id: postId } });
  const postUpdated = await getByPostId(postId);

  return { type: null, message: postUpdated.message };
};

const deleteByPostId = async (userId, postId) => {
  const user = await User.findOne({ where: { id: userId } });
  const post = await BlogPost.findByPk(postId);
  if (!post) return { type: 'POST_NOT_EXIST', message: 'Post does not exist' };
  if (user.id !== post.userId) return { type: 'UNAUTHORIZED_USER', message: 'Unauthorized user' };

  await BlogPost.destroy({ where: { id: postId } });

  return { type: null, message: '' };
};

module.exports = {
  createPost,
  getPosts,
  searchPost,
  getByPostId,
  updateByPostId,
  deleteByPostId,
};
