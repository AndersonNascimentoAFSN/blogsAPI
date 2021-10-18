const { BlogPost } = require('../../models');
const blogPostSchema = require('../../schemas/blogPost');
const BlogPostAllCategoryIdExists = require('../../utils/BlogPostAllCategoryIdExists');

module.exports = async (newPostData, categoryIds) => {
  const { error } = blogPostSchema.blogPostValidations({ ...newPostData, categoryIds });

  if (error) return { status: 400, message: error.details[0].message };

  const post = await BlogPostAllCategoryIdExists(categoryIds);

  if (!post) return { status: 400, message: '"categoryIds" not found' };

  const createdPost = await BlogPost.create(newPostData);

  createdPost.setCategories(categoryIds);
  
  return createdPost;
};