import User from '../components/user/model';
import config from '../config/config';

export default () => {
  [1, 2, 3, 4, 5].forEach((item, index) => {
    const user = new User();
    user.save(() => { config.USERS_ID[index] = user.id; });
  });
};
