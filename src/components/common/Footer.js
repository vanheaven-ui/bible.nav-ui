import { Link } from 'react-router-dom';
import '../../styles/footer.css';

const Footer = () => (
  <footer id="footer">
    <div className="footer-wrap">
      <h3 className="footer-logo">
        <Link to="/">Bible.nav</Link>
      </h3>
      <p className="address">jdkfljsdfjdslfds</p>
      <ul className="social-links">
        <li>
          <a href="https://www.linkedin.com/in/vanheaven/">
            <i className="fab fa-linkedin" />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/MworekwaE">
            <i className="fab fa-twitter-square" />
          </a>
        </li>
        <li>
          <a href="https://github.com/vanheaven-ui">
            <i className="fab fa-github-square" />
          </a>
        </li>
      </ul>
      <p className="copyright">Bible.nav 2021. All rights reserved</p>
    </div>
  </footer>
);

export default Footer;
