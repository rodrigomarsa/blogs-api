const { CategoryService } = require('../services');
const { mapError } = require('../utils/mapError');

const createCategory = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await CategoryService.createCategory({ name });

  if (type) return res.status(mapError(type)).json({ message });
    
  return res.status(201).json(message);
};

module.exports = {
  createCategory,
};
