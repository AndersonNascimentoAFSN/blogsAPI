const { User } = require('../../models');
const UserSchema = require('../../schemas/user');

module.exports = async ({ email, password }) => {
  const { error } = UserSchema.UserValidations({ email, password });
  if (error) return { status: 400, message: error.details[0].message };

  const userSearch = await User.findOne({ where: { email, password } });  

  if (!userSearch) return { status: 400, message: 'Invalid fields' };
  
  return userSearch;
};