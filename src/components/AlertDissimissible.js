import PropTypes from 'prop-types';
import '../styles/alert.css';

const AlertDisimissible = ({ error, handleClick }) => {
  console.log(handleClick);
  return (
    <p className="show">
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
