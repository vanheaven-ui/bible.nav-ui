import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import chaptersURL from '../constants';
import '../styles/book.css';
import {
  getChapterID, getChapterNum, getVerseId, getVerses,
} from '../redux/actions';
import { getVerseNumbers } from '../redux/selectors';
import fetchData from '../services/fetchData';
import BookLayout from '../components/BookLayout';

const Book = ({ login }) => {
  //  state variable to manage actie button class
  // const [click, setClick] = useState(false);

  // Get chapters from Redux store using useSelector hook
  const chapters = useSelector(state => state.chapter);
  const user = useSelector(state => state.user);
  const bookName = useSelector(state => state.name);

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
    e.target.className = e.target.className === 'activeBtn' ? '' : 'activeBtn';
    dispatch(getChapterNum(e.target.textContent));
    dispatch(getChapterID(e.target.id));
    fetchData(chaptersURL(e.target.id))
      .then(data => {
        console.log(data.data.content);
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
      <BookLayout
        loadVerse={loadVerse}
        getVerse={getVerse}
        params={{ bookName, chapters, verses }}
      />
    </section>
  );
};

Book.propTypes = {
  login: PropTypes.bool.isRequired,
};

export default Book;
