import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import '../styles/book.css';
import BookLayout from '../components/BookLayout';
import persistLogin from '../util';
import retrieveVerses from '../redux/actions/verses/verses';
import getVerseId from '../redux/actions/verses/verseId';
import getChapterID from '../redux/actions/chapters/chapterID';
import getChapterNum from '../redux/actions/chapters/chapterNum';

const Book = ({ currentUser, login }) => {
  const chapters = useSelector(state => state.chapter);
  const user = JSON.parse(localStorage.getItem('user'));
  const bookName = useSelector(state => state.name);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [verses, setVerses] = useState([]);
  const hist = useHistory();
  const favorites = JSON.parse(localStorage.getItem('favorites'));

  useEffect(() => persistLogin(dispatch, currentUser, favorites, login), []);

  // Method to load verses on Click
  const loadVerse = e => {
    e.target.className = 'activeBtn';
    dispatch(getChapterNum(e.target.textContent));
    dispatch(getChapterID(e.target.id));
    retrieveVerses(dispatch, e.target.id, setVerses);
  };

  // get specific verse on click but login first
  const getVerse = e => {
    dispatch(getVerseId(e.target.id));
    if (user && user.jwt !== '' && login) {
      hist.push(`/books/${id}/verses/${e.target.id}`);
    } else {
      hist.push('/login');
    }
  };

  return (
    <section className="book-details">
      { !bookName && (
        <button className="go-home go-back" onClick={() => hist.push('/')} type="button">
          <i className="far fa-hand-point-left" />
          {' '}
          {' '}
          Click to go back to retrieve your book
        </button>
      )}
      { bookName && (
        <BookLayout
          loadVerse={loadVerse}
          getVerse={getVerse}
          params={{ bookName, chapters, verses }}
        />
      )}
    </section>
  );
};

Book.propTypes = {
  login: PropTypes.func.isRequired,
  currentUser: PropTypes.instanceOf(Object),
};

Book.defaultProps = {
  currentUser: {},
};

export default Book;
