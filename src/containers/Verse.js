import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import VerseLayout from '../components/VerseLayout';
import '../styles/verse.css';
import persistLogin from '../util';
import fetchScripture from '../services/fetchScripture';
import addFavoriteVerse from '../redux/actions/favorites/addFavorite';

const Verse = ({ currentUser, login }) => {
  const { verse } = useParams();
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const [verseID, setVerseID] = useState(verse);
  const [favoriteStatus, setFavoriteStatus] = useState(false);
  const [scripture, setScripture] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const hist = useHistory();

  const favortes = JSON.parse(localStorage.getItem('favorites'));

  const favorite = {
    book_name: scripture.Book,
    chapter_num: scripture.Chapter,
    verse_num: scripture.Verse,
    verse: scripture.Output,
  };

  const { chapterNum } = useSelector(state => state.chapterId);
  const bookName = useSelector(state => state.name);
  const { user, favorites } = useSelector(state => state.user);
  const { jwt: token, user: currUser } = user;
  let userId;
  currUser ? userId = currUser.id : userId = ''; // eslint-disable-line

  const params = {
    verseID,
    chapterNum,
    bookName,
  };

  const addFavoriteParams = {
    userId,
    favoriteStatus,
    token,
    favorite,
  };

  // Get verse chosen from external api
  useEffect(() => {
    persistLogin(dispatch, currentUser, favortes, login);

    setIsLoading(true);
    if (favorites) {
      favorites.forEach(obj => {
        if (obj.book_name === favorite.book_name
            && favorite.chapter_num === obj.chapter_num
            && favorite.verse_num === obj.verse_num
            && favorite.verse === obj.verse) {
          setFavoriteStatus(true);
        }
      });
    }

    fetchScripture(params, setText, setScripture, setIsLoading);
  }, []);

  const handleNext = e => {
    const newVerse = parseInt(verseID, 10);
    setVerseID((newVerse + 1).toString());
    setIsLoading(true);
    e.target.parentElement.setAttribute('style', 'cursor: not-allowed;');

    fetchScripture(params, setText, setScripture, setIsLoading);
  };

  // Add to favorites on click
  const addFavorite = () => {
    setIsAdding(true);
    addFavoriteVerse(dispatch, addFavoriteParams, setFavoriteStatus, setIsAdding);
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
          isAdding={isAdding}
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
