const { User } = require('../../models');

module.exports = async (id) => {
  const user = await User.findOne({ 
    where: { id },
    attributes: { exclude: ['password'] },
  });

  return user;
};