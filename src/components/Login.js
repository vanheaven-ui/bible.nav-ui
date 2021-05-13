import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useHistory, Link,
} from 'react-router-dom';
import { useLastLocation } from 'react-router-last-location';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import { getCurrentUser, getFavorites } from '../redux/actions';
import '../styles/login.css';
import fetchFavorites from '../services/fetchFavorites';
import AlertDisimissible from './AlertDissimissible';

const Login = ({ update }) => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [click, setClick] = useState(false);

  const [passwordType, setPasswordType] = useState('password');

  const verseID = useSelector(state => state.verses.id);

  const [signingin, setSigningin] = useState(false);

  const lastLocation = useLastLocation();

  const hist = useHistory();
  const dispatch = useDispatch();

  const loginParams = {
    username,
    password,
  };

  const toggle = e => {
    if (e.target.checked) {
      setPasswordType('text');
    } else if (!e.target.checked) {
      setPasswordType('password');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSigningin(true);

    fetch('https://biblenav-api.herokuapp.com/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginParams),
    })
      .then(res => {
        setSigningin(false);
        if (res.ok) {
          return res.json();
        }
        throw Error('Username or password is invalid');
      })
      .then(data => {
        update(true);
        localStorage.setItem('user', JSON.stringify(data));
        dispatch(getCurrentUser(JSON.parse(localStorage.getItem('user'))));
        const { jwt: token, user } = data;
        fetchFavorites(user.id, token)
          .then(data => {
            localStorage.setItem('favorites', JSON.stringify(data.favorites));
            dispatch(getFavorites(JSON.parse(localStorage.getItem('favorites'))));
          })
          .catch(err => console.log(err.message));
        if (lastLocation && lastLocation.pathname.indexOf('books') !== -1) {
          const bookID = lastLocation.pathname.split('/')[2];
          hist.push(`/books/${bookID}/verses/${verseID}`);
        } else {
          hist.push('/');
        }
      })
      .catch(err => {
        setError(err.message);
        setClick(true);
      });
  };

  const handleClick = () => {
    setClick(false);
  };

  return (
    <section className="login">
      { error && <AlertDisimissible error={error} handleClick={handleClick} click={click} /> }
      <h3 className="h4">Login into Bible.nav and manage your favorites</h3>
      <form onSubmit={e => handleSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type={passwordType}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <p className="show-hide">
            <small>show password</small>
            {' '}
            <input type="checkbox" id="show-password" onClick={e => toggle(e)} />
          </p>
        </div>

        <div className="actions">
          { !signingin && (
            <button type="submit" className="block-btn">Login</button>
          )}
          { signingin && (
          <button
            type="button"
            disabled
            className="block-btn"
            style={{ display: 'flex', justifyContent: 'center', cursor: 'not-allowed' }}
          >
            Logging in
            <ReactLoading type="bubbles" color="#fff" width="30px" height="20px" />
          </button>
          ) }
        </div>
      </form>
      <div className="other-action">
        Do not have an account?
        {' '}
        <Link to="/signup">Register Here</Link>
      </div>
    </section>
  );
};

Login.propTypes = {
  update: PropTypes.func.isRequired,
};

export default Login;
