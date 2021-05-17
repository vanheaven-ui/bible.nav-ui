import { useState } from 'react';
import '../../styles/Navbar.css';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../images/logo1.png';

const Navbar = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link
          to="/"
          className="brand nav-logo"
          onClick={handleClick}
        >
          <img src={logo} alt="logo" width="50px" height="50px" />
          Bible.nav
        </Link>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <NavLink
              to="/signup"
              activeClassName="active"
              className="nav-links"
              onClick={handleClick}
            >
              Signup
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/login"
              activeClassName="active"
              className="nav-links"
              onClick={handleClick}
            >
              Login
            </NavLink>
          </li>
        </ul>
        <button className="nav-icon" type="button" onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} aria-label="times" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
