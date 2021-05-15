import PropTypes from 'prop-types';
import '../styles/alert.css';

const AlertDisimissible = ({ error, handleClick, click }) => {
  console.log(typeof (error));
  return (
    <div className={click ? 'my-alert show' : 'my-alert hide'}>
      <p className="heading">
        <i className="fas fa-exclamation-triangle" />
        <button
          type="button"
          onClick={e => handleClick(e)}
        >
          X
        </button>
      </p>
      <div className="messages">
        {error.split(',').map(msg => (
          <p key={msg}>{msg}</p>
        ))}
      </div>
    </div>
  );
};

AlertDisimissible.propTypes = {
  error: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  click: PropTypes.bool.isRequired,
};

export default AlertDisimissible;
