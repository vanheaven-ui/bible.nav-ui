import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../styles/signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');

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
    fetch('https://biblenav-api.herokuapp.com/api/v1/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupParams),
    })
      .then(res => {
        setRegistering(false);
        if (res.ok) {
          hist.push('/login');
        }
      });
  };

  return (
    <section className="signup">
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
          { registering && <button type="button" disabled className="block-btn">Registering...</button> }
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
