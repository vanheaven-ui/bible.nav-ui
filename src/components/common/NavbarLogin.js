import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { removeUser } from '../../redux/actions';
import '../../styles/Navbar.css';
import logo from '../../images/logo1.png';

const LoggedInNavbar = ({ status }) => {
  // Use useDispatch hook to send actions to redux store
  const dispatch = useDispatch();

  // Variables to toggle navbar display
  const [click, setClick] = useState();

  // get current user from redux store
  const currentUser = useSelector(state => state.user);

  // function to handle login status
  const handleLogout = () => {
    dispatch(removeUser);
    status(false);
  };

  const handleClick = () => setClick(!click);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img src={logo} alt="logo" width="50px" height="50px" />
          Bible.nav
        </Link>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item profile">
            <span>
              <small>~/</small>
              {' '}
              {currentUser.user.username}
            </span>
          </li>
          <li className="nav-item">
            <NavLink to="/favorites" activeClassName="active" className="nav-links">Favourites</NavLink>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={handleLogout}>Logout</Link>
          </li>
        </ul>
        <button className="nav-icon" type="button" onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} aria-label="times" />
        </button>
      </div>
    </nav>
  );
};

LoggedInNavbar.propTypes = {
  status: PropTypes.func.isRequired,
};

export default LoggedInNavbar;
