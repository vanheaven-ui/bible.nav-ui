import { ADD_FAVORITE } from '../../actionTypes';

const getFavorite = favorite => ({
  type: ADD_FAVORITE,
  payload: favorite,
});

const addFavoriteVerse = (dispatch, params, setFavoriteStatus, setIsAdding) => {
  fetch(`https://biblenav-api.herokuapp.com/api/v1/users/${params.userId}/favorites`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `${params.token}`,
      credentials: 'include',
    },
    body: JSON.stringify(params.favorite),
  })
    .then(res => res.json())
    .then(data => {
      setFavoriteStatus(!params.favoriteStatus);
      dispatch(getFavorite(data.favorite));
      const arr = JSON.parse(localStorage.getItem('favorites'));
      arr.push(data.favorite);
      localStorage.setItem('favorites', JSON.stringify(arr));
    })
    .catch(err => console.log(err.message))
    .finally(() => setIsAdding(false));
};

export default addFavoriteVerse;
