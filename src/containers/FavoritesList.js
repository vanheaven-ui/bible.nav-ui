import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Favorite from '../components/Favorite';
import { ridFavorite } from '../redux/actions';
import styles from '../styles/favorites.module.css';

const FavoritesList = () => {
  // const [favorites, setFavorites] = useState([]);
  // console.log(favorites.length);
  const hist = useHistory();
  const dispatch = useDispatch();

  const { user, jwt: token, favorites } = useSelector(state => state.user);
  console.log(favorites);

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
    if (!user) {
      hist.push('/');
    }
  }, []);
  return (
    <section className={styles.favorites}>
      <h2>Your Favorites</h2>
      <div className={styles.favorite__list}>
        { favorites && (
          <Favorite favorites={favorites} removeFavorite={removeFavorite} />
        )}
      </div>
    </section>
  );
};

export default FavoritesList;
