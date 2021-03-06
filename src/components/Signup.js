import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ReactLoading from 'react-loading';
import '../styles/signup.css';
import AlertDisimissible from './AlertDissimissible';
import registerService from '../services/register';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [click, setClick] = useState(false);
  const [error, setError] = useState(null);

  // state variables to manage password type
  const [passwordType, setPasswordType] = useState('password');

  const hist = useHistory();

  const [registering, setRegistering] = useState(false);

  const signupParams = {
    username,
    email,
    password,
    password_confirmation: passwordAgain,
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
    setRegistering(true);
    registerService(hist, setError, setClick, setRegistering, signupParams);
  };

  const handleClick = () => setClick(false);

  return (
    <section className="signup">
      { error && <AlertDisimissible error={error} handleClick={handleClick} click={click} /> }
      <h3 className="h4">Register here to have Bible.nav priviledges</h3>
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
            type="text"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
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
        <div className="form-group">
          <input
            type={passwordType}
            placeholder="Type password again"
            value={passwordAgain}
            onChange={e => setPasswordAgain(e.target.value)}
          />
        </div>
        <div className="actions">
          { !registering && <button type="submit" className="block-btn">Register</button> }
          { registering && (
            <button
              type="button"
              disabled
              className="block-btn"
              style={{ display: 'flex', justifyContent: 'center', cursor: 'not-allowed' }}
            >
              Registering
              <ReactLoading type="bubbles" color="#fff" width="30px" height="20px" />
            </button>
          )}
        </div>
      </form>
      <div className="other-action">
        Already registered?
        {' '}
        <Link to="/login">Login Here</Link>
      </div>
    </section>
  );
};

export default Signup;
