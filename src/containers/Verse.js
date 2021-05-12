import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import VerseLayout from '../components/VerseLayout';
import { RAPID_API_BASE } from '../constants';
import { getCurrentUser, getFavorite, getFavorites } from '../redux/actions';
import '../styles/verse.css';

const Verse = ({ currentUser, login }) => {
  // Get route parameters using useParams hook
  const { verse } = useParams();
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const [verseID, setVerseID] = useState(verse);
  console.log(verseID);

  // state variables for favorites management
  const [favoriteStatus, setFavoriteStatus] = useState(false);

  // stte variables to manange verse
  const [scripture, setScripture] = useState({});
  const favorite = {
    book_name: scripture.Book,
    chapter_num: scripture.Chapter,
    verse_num: scripture.Verse,
    verse: scripture.Output,
  };

  // Grab the chapterId and the data from Redux store
  const { chapterNum } = useSelector(state => state.chapterId);
  const bookName = useSelector(state => state.name);
  const { user, favorites } = useSelector(state => state.user);
  console.log(user);
  const { jwt: token, user: currUser } = user;
  let userId;
  currUser ? userId = currUser.id : userId = ''; // eslint-disable-line
  console.log(userId);

  const [isLoading, setIsLoading] = useState(false);
  const hist = useHistory();

  // Get verse chosen from external api
  useEffect(() => {
    const favortes = JSON.parse(localStorage.getItem('favorites'));
    if (currentUser) {
      dispatch(getCurrentUser(currentUser));
      dispatch(getFavorites(favortes));
      login(true);
    }

    setIsLoading(true);
    if (favorites) {
      favorites.forEach(obj => {
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

    fetch(`${RAPID_API_BASE}?Verse=${verseID}&chapter=${chapterNum}&Book=${bookName}`, {
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
        setIsLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  const handleNext = e => {
    setIsLoading(true);
    e.target.parentElement.setAttribute('style', 'cursor: not-allowed;');
    setVerseID((parseInt(verse, 10) + 1).toString());
    fetch(
      `${RAPID_API_BASE}?Verse=${verseID}&chapter=${chapterNum}&Book=${bookName}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '36b571e37emshf64ca4aee9ccebcp1eeaefjsn46401cd9bc4a',
          'x-rapidapi-host': 'ajith-holy-bible.p.rapidapi.com',
        },
      },
    )
      .then(response => response.json())
      .then(data => {
        setText(data.Output);
        setScripture(data);
        setIsLoading(false);
      })
      .catch(err => console.error(err));
  };

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
      .then(data => {
        console.log(data);
        setFavoriteStatus(!favoriteStatus);
        dispatch(getFavorite(data.favorite));
      })
      .catch(err => console.log(err.message));
  };

  return (
    <section className="verse">
      { !bookName && (
        <button className="go-home verse-go" type="button" onClick={() => hist.push('/')}>
          <i className="far fa-hand-point-left" />
          {' '}
          {' '}
          Click to go home and retrieve the book first
        </button>
      )}
      { bookName && (
        <VerseLayout
          params={{
            bookName, chapterNum, text, verse, verseID,
          }}
          handleNext={handleNext}
          addFavorite={addFavorite}
          favoriteStatus={favoriteStatus}
          isLoading={isLoading}
        />
      )}
    </section>
  );
};

Verse.propTypes = {
  login: PropTypes.func.isRequired,
  currentUser: PropTypes.instanceOf(Object),
};

Verse.defaultProps = {
  currentUser: {},
};

export default Verse;
