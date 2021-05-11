import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';

const VerseLayout = ({
  params, handleNext, addFavorite, favoriteStatus, isLoading,
}) => (
  <div className="verse-layout-wrap">
    <h2>{`${params.bookName}`}</h2>
    <h3>
      Chapter:
      {' '}
      {params.chapterNum}
      {' '}
      Verse:
      {' '}
      {params.verseID}
      {' '}
      { favoriteStatus && (
        <i className="fas fa-star" style={{ color: '#e27c08', marginLeft: 10 }} />
      )}
    </h3>
    <p>
      { isLoading && <ReactLoading type="bubbles" color="#ec5200" width="50px" height="50px" /> }
      { !isLoading && (
        <>
          <span>{params.verseID}</span>
          {' '}
          {params.text}
          <button type="button" className="move" onClick={() => handleNext()}>
            <i className="fas fa-angle-right" />
          </button>
        </>
      )}
    </p>
    { !favoriteStatus && (
      <button
        type="button"
        onClick={() => addFavorite()}
      >
        Add to favourites
        <i className="fas fa-star" style={{ color: '#e27c08', marginLeft: 10 }} />
      </button>
    )}
  </div>
);

VerseLayout.propTypes = {
  params: PropTypes.instanceOf(Object).isRequired,
  addFavorite: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  favoriteStatus: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default VerseLayout;
