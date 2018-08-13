const User = require('../components/user/model');

module.exports = () => {
  [1, 2, 3, 4, 5].forEach(() => {
    const user = new User();
    user.save(() => {
      console.log(user);
    });
  });
};
