import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RAPID_API_BASE } from '../constants';
import '../styles/verse.css';

const Verse = () => {
  // Get route parameters using useParams hook
  const { verse } = useParams();
  const [text, setText] = useState('');

  // state variables for favorites management
  const [favoriteStatus, setFavoriteStatus] = useState(false);

  console.log(favoriteStatus);

  // stte variables to manange verse
  const [scripture, setScripture] = useState({});
  const favorite = {
    book_name: scripture.Book,
    chapter_num: scripture.Chapter,
    verse_num: scripture.Verse,
    verse: scripture.Output,
  };

  console.log(favorite);

  // Grab the chapterId and the data from Redux store
  const { chapterNum } = useSelector(state => state.chapterId);
  const bookName = useSelector(state => state.name);
  const { jwt: token, user, favorites } = useSelector(state => state.user);
  let userId;
  user ? userId = user.id : userId = ''; // eslint-disable-line
  console.log(userId);

  // Get verse chosen from external api
  useEffect(() => {
    if (favorites) {
      favorites.favorites.forEach(obj => {
        if (obj.book_name === favorite.book_name
            && favorite.chapter_num === obj.chapter_num
            && favorite.verse_num === obj.verse_num
            && favorite.verse === obj.verse) {
          setFavoriteStatus(true);
          console.log('Forcing a false');
          console.log('Hmm1');
          console.log('Rerendering');
        }
      });
    }

    fetch(`${RAPID_API_BASE}?Verse=${verse}&chapter=${chapterNum}&Book=${bookName}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '36b571e37emshf64ca4aee9ccebcp1eeaefjsn46401cd9bc4a',
        'x-rapidapi-host': 'ajith-holy-bible.p.rapidapi.com',
      },
    })
      .then(response => response.json())
      .then(data => {
        setText(data.Output);
        setScripture(data);
      })
      .catch(err => console.error(err));
  }, [favoriteStatus]);

  // Add to favorites on click
  const addFavorite = () => {
    fetch(`https://biblenav-api.herokuapp.com/api/v1/users/${userId}/favorites`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${token}`,
        credentials: 'include',
      },
      body: JSON.stringify(favorite),
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err.message));
  };

  return (
    <section className="verse">
      <h2>{`${bookName}`}</h2>
      <h3>
        Chapter:
        {' '}
        {chapterNum}
        {' '}
        Verse:
        {' '}
        {verse}
        {' '}
        { favoriteStatus && (
          <i className="fas fa-star" style={{ color: '#e27c08', marginLeft: 10 }} />
        )}
      </h3>
      <p>
        <span>{verse}</span>
        {' '}
        {text}
      </p>
      { !favoriteStatus && (
        <button
          type="button"
          onClick={() => addFavorite()}
        >
          Add to favourites
          <i className="fas fa-star" style={{ color: '#e27c08', marginLeft: 10 }} />
        </button>
      )}
    </section>
  );
};

export default Verse;
