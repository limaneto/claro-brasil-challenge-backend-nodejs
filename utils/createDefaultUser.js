import User from '../components/user/model';
import config from '../config/config';

export default () => {
  [1, 2, 3, 4, 5].forEach(() => {
    const user = new User();
    user.save(() => {});
  });
};
