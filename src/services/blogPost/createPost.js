const Sequelize = require('sequelize');
const config = require('../../config/config');
const { BlogPost } = require('../../models');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const blogPostSchema = require('../../schemas/blogPost');
const BlogPostAllCategoryIdExists = require('../../utils/BlogPostAllCategoryIdExists');

module.exports = async (newPostData, categoryIds) => {
  const t = await sequelize.transaction();

  try {
    const { error } = blogPostSchema.blogPostValidations({ ...newPostData, categoryIds });
    if (error) return { status: 400, message: error.details[0].message };

    const post = await BlogPostAllCategoryIdExists(categoryIds);
    if (!post) return { status: 400, message: '"categoryIds" not found' };

    const createdPost = await BlogPost.create(newPostData);

    createdPost.setCategories(categoryIds);

    await t.commit();

    return createdPost;
  } catch (e) {
    await t.rollback();
    return { status: 500, message: e.message };
  }
};