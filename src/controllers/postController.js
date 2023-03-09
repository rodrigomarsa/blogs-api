const { PostService } = require('../services');
const { mapError } = require('../utils/mapError');

const createPost = async (req, res) => {
  const newPost = req.body;
  const { email } = req.data;
  
  const { type, message } = await PostService.createPost(newPost, email);

  if (type) return res.status(mapError(type)).json({ message });
    
  return res.status(201).json(message);
};

const getPosts = async (_req, res) => {
  const { type, message } = await PostService.getPosts();

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  createPost,
  getPosts,
};
