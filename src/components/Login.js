import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useHistory, Link,
} from 'react-router-dom';
import { useLastLocation } from 'react-router-last-location';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import '../styles/login.css';
import AlertDisimissible from './AlertDissimissible';
import getFavoritesOnLogin from '../redux/actions/favorites/favorites';
import Loggedin from './Loggedin';

const Login = ({ update, login }) => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [click, setClick] = useState(false);

  const [passwordType, setPasswordType] = useState('password');

  const verseID = useSelector(state => state.verses.id);

  const [signingin, setSigningin] = useState(false);

  const lastLocation = useLastLocation();

  if (lastLocation) {
    console.log(lastLocation.pathname);
  }

  const hist = useHistory();
  const dispatch = useDispatch();

  const loginParams = {
    username,
    password,
  };

  const params = {
    setClick, verseID, setSigningin, lastLocation, hist, setError,
  };

  useEffect(() => {
    if (login) {
      setTimeout(() => hist.push('/'), 1500);
    }
  }, []);

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

    getFavoritesOnLogin(dispatch, loginParams, setSigningin, update, params);
  };

  const handleClick = () => {
    setClick(false);
  };

  return (
    <section className="login">
      { error && <AlertDisimissible error={error} handleClick={handleClick} click={click} /> }
      { login && <Loggedin /> }
      { !login && (
        <>
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
        </>
      )}
    </section>
  );
};

Login.propTypes = {
  update: PropTypes.func.isRequired,
  login: PropTypes.bool.isRequired,
};

export default Login;
