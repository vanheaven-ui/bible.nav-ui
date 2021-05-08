import PropTypes from 'prop-types';
import '../styles/Favorite.css';

const Favorite = ({ favorites, removeFavorite }) => (
  <>
    { favorites.length > 0 ? (favorites.map(favorite => (
      <article key={favorite.id}>
        <div className="heading">
          <h2>
            {favorite.book_name}
            <span>{favorite.chapter_num}</span>
            <span>{favorite.verse_num}</span>
          </h2>
          <button type="button" onClick={() => removeFavorite(favorite.id)}>
            <i className="fas fa-trash" />
          </button>
        </div>
        <p>{favorite.verse}</p>
      </article>
    ))) : <p id="no__favorites">No favorites yet</p>}
  </>
);

Favorite.propTypes = {
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      book_name: PropTypes.string.isRequired,
      chapter_num: PropTypes.string.isRequired,
      verse_num: PropTypes.string.isRequired,
      verse: PropTypes.string.isRequired,
    }),
  ).isRequired,
  removeFavorite: PropTypes.func.isRequired,
};

export default Favorite;
