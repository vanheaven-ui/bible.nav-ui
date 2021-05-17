import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import Favorite from '../components/Favorite';
import styles from '../styles/favorites.module.css';
import persistLogin from '../util';
import removeFavorite from '../redux/actions/favorites/removeFavorites';

const FavoritesList = ({ currentUser, login }) => {
  const dispatch = useDispatch();
  const [removing, setRemoving] = useState(false);

  const { user } = useSelector(state => state.user);
  const { jwt: token } = user;

  const { favorites: favrites } = useSelector(state => state.favorites);

  const favorites = JSON.parse(localStorage.getItem('favorites'));

  // Define params to use in the removeFavorite action
  const params = {
    userID: user.id,
    token,
  };

  useEffect(() => persistLogin(dispatch, currentUser, favorites, login), []);

  const handleRemoveClick = id => {
    removeFavorite(dispatch, setRemoving, id, params);
  };

  return (
    <section className={styles.favorites}>
      { removing && <ReactLoading type="bubbles" color="#fff" width="80px" height="70px" /> }
      <>
        <h2>Your Favorite Verses</h2>
        <div className={styles.favorite__list}>
          { favrites && (
            <Favorite favorites={favrites} removeFavorite={handleRemoveClick} />
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
