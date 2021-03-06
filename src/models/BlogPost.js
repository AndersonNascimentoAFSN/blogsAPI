const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BlogPost extends Model {
    static associate(models) { 
      BlogPost.belongsTo(models.User, { as: 'user', foreignKey: 'userId' }); 
    }
  }
  BlogPost.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.STRING,
    updated: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'BlogPost',
    tableName: 'BlogPosts',
    underscored: true,
    timestamps: false,
  });
  return BlogPost;
};