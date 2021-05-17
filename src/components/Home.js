import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import { BOOKS_URL, dateOptions } from '../constants';
import fetchData from '../services/fetchData';
import verseOfDay from '../services/verseOfDay';
import '../styles/home.css';
import persistLogin from '../util';
import retrieveChapters from '../redux/actions/chapters/chapters';
import getBookName from '../redux/actions/bookName';

const Home = ({ currentUser, login }) => {
  const hist = useHistory();
  const [isLoading, setIsLoading] = useState();
  const dispatch = useDispatch();
  const [VoD, setVoD] = useState('');
  const [ref, setRef] = useState('');

  // Variables for books of the bible
  const [newTestament, setNewTestament] = useState([]);
  const [oldTestament, setOldTestament] = useState([]);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [currentTime] = useState(new Date().toLocaleDateString('en', dateOptions));

  // variables to show chapters
  const [showChapters, setShowChapters] = useState(false);

  // local storage
  const favorites = JSON.parse(localStorage.getItem('favorites'));

  useEffect(() => {
    persistLogin(dispatch, currentUser, favorites, login);
    setIsLoading(true);
    verseOfDay().then(data => {
      setIsLoading(false);
      setVoD(data.Output);
      setRef(`${data.Book} ${data.Chapter}:${data.Verse}`);
    });

    fetchData(BOOKS_URL)
      .then(data => {
        setOldTestament(data.data.slice(0, 53));
        setNewTestament(data.data.slice(53));
      });
  }, []);

  const handleClick = e => {
    if (e.target.name === 'new' && !showNew) {
      setShowNew(true);
    } else {
      setShowNew(false);
    }

    if (e.target.name === 'old' && !showOld) {
      setShowOld(true);
    } else {
      setShowOld(false);
    }

    if (showChapters) {
      setShowChapters(false);
    }
  };

  // Function to get chapters of each book and dispatch them to store
  const fetchChapters = e => {
    dispatch(getBookName(e.target.name));
    retrieveChapters(dispatch, setShowChapters, hist, e.target.id);
  };

  return (
    <>
      <div className="App">
        <section className="hero">
          <p className="caret">
            <i className="fas fa-angle-double-down" />
          </p>
          <div className="hero-text">
            <Container>
              <Row>
                <Col id="left-col" xs={{ span: 12, order: 'last' }} md={{ span: 6, order: 'first' }}>
                  <div className="left-hero">
                    <h2> Navigating the Bible simplified</h2>
                    <p>Your favorite bible verse is a login away</p>
                    <button type="button" className="orange-button">
                      <Link to="/signup">START HERE</Link>
                    </button>
                  </div>
                </Col>
                <Col xs={{ span: 12, order: 'first' }} md={{ span: 6, order: 'last' }}>
                  <div className="hero-heading">
                    <small>{currentTime}</small>
                    <h4>VERSE OF THE DAY:</h4>
                    <h2>{ref}</h2>
                  </div>
                  <div className="verse-section">
                    { isLoading && <ReactLoading type="bubbles" color="#fff" width="100px" height="100px" /> }
                    { !isLoading && <p className="verse-of-day">{VoD}</p> }
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </section>
        <section className="book-list">
          <h2>GET BOOKS OF THE BIBLE</h2>
          <Container fluid id="bible-sections">
            <Row>
              <Col xs={12} md={6} id="navigate">
                <h4>Let us navigate the sections of the bible</h4>
                <i className="fas fa-caret-right fa-3x right-fa" />
                <i className="fas fa-caret-down fa-3x down-fa" />
              </Col>
              <Col xs={12} md={6}>
                { !showOld && (
                <button
                  type="button"
                  name="new"
                  onClick={e => handleClick(e)}
                  title="Click me!"
                >
                  NEW TESTAMENT
                </button>
                )}
                { !showNew && (
                <button
                  type="button"
                  name="old"
                  onClick={e => handleClick(e)}
                  title="Click me!"
                >
                  OLD TESTAMENT
                </button>
                )}
                { showNew && (
                <div className="new">
                  { newTestament.length > 0 && newTestament.map(book => (
                    <button
                      name={book.name}
                      type="button"
                      id={book.id}
                      key={book.id}
                      onClick={e => fetchChapters(e)}
                    >
                      {book.name}
                    </button>
                  ))}
                </div>
                )}
                { showOld && (
                <div className="old">
                  { oldTestament.length > 0 && oldTestament.map(book => (
                    <button
                      name={book.name}
                      type="button"
                      id={book.id}
                      key={book.id}
                      onClick={e => fetchChapters(e)}
                    >
                      {book.name}
                    </button>
                  ))}
                </div>
                )}
              </Col>
            </Row>
          </Container>
        </section>
        <section className="favorites-pitch">
          <h3>CREATE YOUR FAVORITES</h3>
          <p>Have your favorites in one place by registering or signing in</p>
          <div className="buttons">
            <button type="button" className="orange-button"><Link to="/signup">REGISTER</Link></button>
            <button type="button" className="outline-btn"><Link to="/login">LOGIN</Link></button>
          </div>
        </section>
      </div>
    </>
  );
};

Home.propTypes = {
  currentUser: PropTypes.instanceOf(Object),
  login: PropTypes.func.isRequired,
};

Home.defaultProps = {
  currentUser: {},
};

export default Home;
