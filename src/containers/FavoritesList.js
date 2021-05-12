import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import Favorite from '../components/Favorite';
import { getCurrentUser, getFavorites, ridFavorite } from '../redux/actions';
import styles from '../styles/favorites.module.css';

const FavoritesList = ({ currentUser, login }) => {
  const dispatch = useDispatch();
  const [removing, setRemoving] = useState(false);

  const { user, favorites: favrites } = useSelector(state => state.user);
  const { jwt: token } = user;

  const favorites = JSON.parse(localStorage.getItem('favorites'));

  useEffect(() => {
    if (currentUser && favorites) {
      dispatch(getCurrentUser(currentUser));
      dispatch(getFavorites(favorites));
      login(true);
    }
  }, []);

  const removeFavorite = id => {
    setRemoving(true);
    fetch(`https://biblenav-api.herokuapp.com/api/v1/users/${user.id}/favorites/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `${token}`,
        credentials: 'include',
      },
    })
      .then(() => {
        dispatch(ridFavorite(id));
        setRemoving(false);
        const arr = JSON.parse(localStorage.getItem('favorites'));
        const newArr = arr.filter(scripture => scripture.id !== id);
        localStorage.setItem('favorites', JSON.stringify(newArr));
      })
      .catch(err => console.log(err.message));
  };

  return (
    <section className={styles.favorites}>
      { removing && <ReactLoading type="bubbles" color="#fff" width="80px" height="70px" /> }
      <>
        <h2>Your Favorite Verses</h2>
        <div className={styles.favorite__list}>
          { favrites && (
            <Favorite favorites={favrites} removeFavorite={removeFavorite} />
          )}
        </div>
      </>
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
