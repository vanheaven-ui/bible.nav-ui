import { useState } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import chaptersURL from '../constants';
import '../styles/book.css';
import {
  getChapterID, getChapterNum, getVerseId, getVerses,
} from '../redux/actions';
import { getVerseNumbers } from '../redux/selectors';
import fetchData from '../services/fetchData';

const Book = ({ login }) => {
  const [click, setClick] = useState(false);
  // Get chapters from Redux store using useSelector hook
  const chapters = useSelector(state => state.chapter);
  const user = useSelector(state => state.user);
  const bookName = useSelector(state => state.name);
  const noOfChapters = 10;

  // useParams to get the ID of the Chapter
  const { id } = useParams();

  // useDispatch to dispatch getVerses action
  const dispatch = useDispatch();

  // variables to handle verses
  const [verses, setVerses] = useState([]);

  // useHistory to browse to to verse page/component
  const hist = useHistory();

  // Method to load verses on Click
  const loadVerse = e => {
    dispatch(getChapterNum(e.target.textContent));
    dispatch(getChapterID(e.target.id));
    fetchData(chaptersURL(e.target.id))
      .then(data => {
        setClick(!click);
        setVerses(getVerseNumbers(data.data.content));
        dispatch(getVerses(data.data.content));
      });
  };

  // get specific verse on click but login first
  const getVerse = e => {
    dispatch(getVerseId(e.target.id));
    if (Object.keys(user).length > 0 && login) {
      hist.push(`/books/${id}/verses/${e.target.id}`);
    } else {
      hist.push('/login');
    }
  };

  return (
    <section className="book-details">
      <header>
        <h2>
          The book of
          {' '}
          {bookName}
        </h2>
        <p>
          Enjoy the
          {' '}
          {noOfChapters}
          {' '}
          chapters of this book. Click on each chapter number to get the verses.
        </p>
      </header>
      <Container className="chapter-list">
        <h4>Chapters</h4>
        {' '}
        { chapters && chapters.map(chapter => (
          <button
            type="button"
            id={chapter.id}
            key={chapter.id}
            onClick={e => loadVerse(e)}
            className={click ? 'activeBtn' : ''}
          >
            {chapter.number}
          </button>
        ))}
      </Container>
      <Container className="verse-list">
        <h5>Verses</h5>
        {' '}
        { verses && verses.map(verse => (
          <button
            type="button"
            id={verse}
            key={verse}
            onClick={e => getVerse(e)}
          >
            {verse}
          </button>
        ))}
      </Container>
    </section>
  );
};

Book.propTypes = {
  login: PropTypes.bool.isRequired,
};

export default Book;
