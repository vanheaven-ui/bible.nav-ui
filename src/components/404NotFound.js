import { useHistory } from 'react-router-dom';
import '../styles/notfound.css';

const NotFound = () => {
  const hist = useHistory();

  return (
    <section className="not-found">
      <div className="overlay-notfound" />
      <button type="button" onClick={() => hist.goBack()}>
        <i className="fas fa-hand-point-left" />
        {' '}
        Go Back
      </button>
      <p>Always safe to take a step back when something is amiss</p>
    </section>
  );
};

export default NotFound;
