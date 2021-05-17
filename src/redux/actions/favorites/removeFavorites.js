import { REMOVE_FAVORITE } from '../../actionTypes';

export const ridFavorite = id => (
  {
    type: REMOVE_FAVORITE,
    id,
  }
);

const removeFavorite = (dispatch, setRemoving, id, params) => {
  setRemoving(true);
  fetch(`https://biblenav-api.herokuapp.com/api/v1/users/${params.userID}/favorites/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `${params.token}`,
      credentials: 'include',
    },
  })
    .then(() => {
      dispatch(ridFavorite(id));
      const arr = JSON.parse(localStorage.getItem('favorites'));
      const newArr = arr.filter(scripture => scripture.id !== id);
      localStorage.setItem('favorites', JSON.stringify(newArr));
    })
    .catch(err => console.log(err.message))
    .finally(() => setRemoving(false));
};

export default removeFavorite;
