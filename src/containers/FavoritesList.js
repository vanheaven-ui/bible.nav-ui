import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Favorite from '../components/Favorite';
import { getCurrentUser, getFavorites, ridFavorite } from '../redux/actions';
import styles from '../styles/favorites.module.css';

const FavoritesList = ({ currentUser, login }) => {
  const dispatch = useDispatch();

  const { user, jwt: token, favorites } = useSelector(state => state.user);

  const removeFavorite = id => {
    console.log(id);
    fetch(`https://biblenav-api.herokuapp.com/api/v1/users/${user.id}/favorites/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `${token}`,
        credentials: 'include',
      },
    })
      .then(() => {
        console.log('Deleted!');
        dispatch(ridFavorite(id));
      })
      .catch(err => console.log(err.message));
  };

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    if (currentUser && favorites) {
      dispatch(getCurrentUser(currentUser));
      dispatch(getFavorites(favorites));
      login(true);
    }
  }, []);

  return (
    <section className={styles.favorites}>
      <h2>Your Favorite Verses</h2>
      <div className={styles.favorite__list}>
        { favorites && (
          <Favorite favorites={favorites} removeFavorite={removeFavorite} />
        )}
      </div>
    </section>
  );
};

FavoritesList.propTypes = {
  login: PropTypes.func.isRequired,
  currentUser: PropTypes.instanceOf(Object),
};

FavoritesList.defaultProps = {
  currentUser: {},
};

export default FavoritesList;
