const PostService = require('../../services/blogPost');

module.exports = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id: userId } = req.user;

  const createdPost = await PostService.createPost({ title, content, userId }, categoryIds);

  if (createdPost.message) {
    return res
      .status(createdPost.status).json({ message: createdPost.message }); 
  }

  res.status(201).json(createdPost);
};