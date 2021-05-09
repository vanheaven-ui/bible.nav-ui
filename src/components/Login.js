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
  const [error, setError] = useState(null);

  // state variables to manage password type
  const [passwordType, setPasswordType] = useState('password');

  const verseID = useSelector(state => state.verses.id);
  console.log(verseID);

  const [signingin, setSigningin] = useState(false);

  const lastLocation = useLastLocation();
  console.log(lastLocation);

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
          console.log('Log in successful!');
          return res.json();
        }
        throw Error('Username or password is invalid');
      })
      .then(data => {
        dispatch(getCurrentUser(data));
        const { jwt: token, user } = data;
        fetchFavorites(user.id, token)
          .then(data => {
            dispatch(getFavorites(data.favorites));
          })
          .catch(err => console.log(err.message));
        update(true);
        if (lastLocation.pathname !== '' && lastLocation.pathname.indexOf('books') !== -1) {
          const bookID = lastLocation.pathname.split('/')[2];
          hist.push(`/books/${bookID}/verses/${verseID}`);
        } else {
          hist.push('/');
        }
      })
      .catch(err => setError(err.message));
  };

  const handleClick = e => {
    e.target.parentElement.className = 'hide';
  };

  return (
    <section className="login">
      { error && <AlertDisimissible error={error} handleClick={handleClick} /> }
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
          { !signingin && <button type="submit" className="block-btn">Login</button> }
          { signingin && (
          <button type="button" disabled className="block-btn" style={{ display: 'flex' }}>
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
