import PropTypes from 'prop-types';

const VerseLayout = ({
  params, handleNext, addFavorite, favoriteStatus, isLoading, isAdding,
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
    <div>
      { isLoading && <p>Loading...</p> }
      { !isLoading && (
        <>
          <span>{params.verseID}</span>
          {' '}
          {params.text}
          <button type="button" className="move" onClick={e => handleNext(e)}>
            <i className="fas fa-angle-right" />
          </button>
        </>
      )}
    </div>
    { !favoriteStatus && (
      <button
        type="button"
        onClick={() => addFavorite()}
      >
        { isAdding && (
          <span style={{ color: '#555', cursor: 'not-allowed' }}>Adding Favorite...</span>
        )}
        { !isAdding && <span> Add to favourites</span> }
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
  isAdding: PropTypes.bool.isRequired,
};

export default VerseLayout;
