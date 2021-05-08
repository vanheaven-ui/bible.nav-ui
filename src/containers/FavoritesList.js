import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Favorite from '../components/Favorite';
import styles from '../styles/favorites.module.css';

const FavoritesList = () => {
  const [favorites, setFavorites] = useState([]);
  console.log(favorites.length);
  const hist = useHistory();

  const { user, jwt: token } = useSelector(state => state.user);

  const removeFavorite = id => {
    console.log(id);
    fetch(`https://biblenav-api.herokuapp.com/api/v1/users/${user.id}/favorites/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `${token}`,
        credentials: 'include',
      },
    })
      .then(() => console.log('Deleted!'))
      .catch(err => console.log(err.message));
  };

  useEffect(() => {
    if (!user) {
      hist.push('/');
    } else {
      fetch(`https://biblenav-api.herokuapp.com/api/v1/users/${user.id}/favorites`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `${token}`,
          credentials: 'include',
        },
      })
        .then(res => {
          if (!res.ok) {
            throw Error('Not successful');
          }
          console.log('Successful');
          return res.json();
        })
        .then(data => {
          console.log(data);
          setFavorites(data.favorites);
        })
        .catch(err => console.log(err.message));
    }
  }, []);
  return (
    <section className={styles.favorites}>
      <h2>Your Favorites</h2>
      <div className={styles.favorite__list}>
        <Favorite favorites={favorites} removeFavorite={removeFavorite} />
      </div>
    </section>
  );
};

export default FavoritesList;
