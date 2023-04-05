const { PostService } = require('../services');
const { mapError } = require('../utils/mapError');

const createPost = async (req, res) => {
  const newPost = req.body;
  const { id } = req.data;

  const { type, message } = await PostService.createPost(newPost, id);

  if (type) return res.status(mapError(type)).json({ message });
    
  return res.status(201).json(message);
};

const getPosts = async (_req, res) => {
  const { type, message } = await PostService.getPosts();

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

const searchPost = async (req, res) => {
  const { q } = req.query;
  if (q) {
    const { message } = await PostService.searchPost(q);
    return res.status(200).json(message);
  }
  const { type, message } = await PostService.getPosts();
  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

const getByPostId = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await PostService.getByPostId(id);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

const updateByPostId = async (req, res) => {
  const { id: postId } = req.params;
  const { id: userId } = req.data;
  const postToUpdate = req.body;

  const { type, message } = await PostService.updateByPostId(userId, postId, postToUpdate);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

const deleteByPostId = async (req, res) => {
  const { id: postId } = req.params;
  const { id: userId } = req.data;

  const { type, message } = await PostService.deleteByPostId(userId, postId);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(204).end();
};

module.exports = {
  createPost,
  getPosts,
  searchPost,
  getByPostId,
  updateByPostId,
  deleteByPostId,
};
