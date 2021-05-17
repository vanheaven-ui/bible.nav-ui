import { getFavorites } from './redux/actions/favorites/favorites';
import getCurrentUser from './redux/actions/user/user';

const persistLogin = (dispatch, currentUser, favorites, login) => {
  if (currentUser && favorites) {
    dispatch(getCurrentUser(currentUser));
    dispatch(getFavorites(favorites));
    login(true);
  }
};

export default persistLogin;
