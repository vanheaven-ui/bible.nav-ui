import PropTypes from 'prop-types';
import '../styles/alert.css';

const AlertDisimissible = ({ error, handleClick, click }) => {
  console.log(click);
  return (
    <p className={click ? 'show' : 'hide'}>
      <i className="fas fa-exclamation-triangle" />
      {error}
      <button
        type="button"
        onClick={e => handleClick(e)}
      >
        X
      </button>
    </p>
  );
};

AlertDisimissible.propTypes = {
  error: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  click: PropTypes.bool.isRequired,
};

export default AlertDisimissible;
