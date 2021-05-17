import { GET_FAVORITES } from '../../actionTypes';
import fetchFavorites from '../../../services/fetchFavorites';
import getCurrentUser from '../user/user';

export const getFavorites = favorites => ({
  type: GET_FAVORITES,
  payload: favorites,
});

const getFavoritesOnLogin = (dispatch, loginParams, setSigningin, update, params) => {
  fetch('https://biblenav-api.herokuapp.com/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginParams),
  })
    .then(res => {
      setSigningin(false);
      if (res.ok) {
        return res.json();
      }
      throw Error('Username or password is invalid');
    })
    .then(data => {
      update(true);
      localStorage.setItem('user', JSON.stringify(data));
      dispatch(getCurrentUser(JSON.parse(localStorage.getItem('user'))));
      const { jwt: token, user } = data;
      fetchFavorites(user.id, token)
        .then(data => {
          localStorage.setItem('favorites', JSON.stringify(data.favorites));
          dispatch(getFavorites(JSON.parse(localStorage.getItem('favorites')).filter(el => el !== null)));
        })
        .catch(err => console.log(err.message));
      if (params.lastLocation && params.lastLocation.pathname.indexOf('books') !== -1) {
        const bookID = params.lastLocation.pathname.split('/')[2];
        params.hist.push(`/books/${bookID}/verses/${params.verseID}`);
      } else {
        params.hist.push('/');
      }
    })
    .catch(err => {
      params.setError(err.message);
      params.setClick(true);
    });
};

export default getFavoritesOnLogin;
