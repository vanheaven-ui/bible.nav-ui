import PropTypes from 'prop-types';

const AlertDisimissible = ({ error }) => {
  const handleClick = e => {
    e.target.parentElement.remove();
  };

  return (
    <p>
      {error}
      <button type="button" onClick={e => handleClick(e)}>X</button>
    </p>
  );
};

AlertDisimissible.propTypes = {
  error: PropTypes.string.isRequired,
};

export default AlertDisimissible;
