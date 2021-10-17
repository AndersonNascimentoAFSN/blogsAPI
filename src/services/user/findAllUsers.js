const { User } = require('../../models');

module.exports = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  return users;
};