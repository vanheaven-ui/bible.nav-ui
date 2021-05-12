import PropTypes from 'prop-types';
import '../styles/alert.css';

const AlertDisimissible = ({ error, handleClick }) => {
  console.log(error);
  return (
    <p className="show">
      <i className="fas fa-exclamation-triangle" />
      {error}
      <button type="button" onClick={e => handleClick(e)}>X</button>
    </p>
  );
};

AlertDisimissible.propTypes = {
  error: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default AlertDisimissible;
