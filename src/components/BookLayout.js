import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

const BookLayout = ({
  params, loadVerse, getVerse,
}) => {
  const chapters = params.chapters.filter(chapter => chapter.number !== 'intro');

  return (
    <div className="book-details_wrap">
      <header>
        <h2>
          The book of
          {' '}
          {params.bookName}
        </h2>
        <p>
          Enjoy the
          {' '}
          {chapters.length}
          {' '}
          chapters of this book. Click on each chapter number to get the verses.
        </p>
      </header>
      <Container className="chapter-list">
        <h4>Chapters</h4>
        {' '}
        { params.chapters && chapters.map(chapter => (
          <button
            type="button"
            id={chapter.id}
            key={chapter.id}
            onClick={e => loadVerse(e)}
            className=""
          >
            {chapter.number}
          </button>
        ))}
      </Container>
      <Container className="verse-list">
        <h5>Verses</h5>
        {' '}
        { params.verses && params.verses.map(verse => (
          <button
            type="button"
            id={verse}
            key={verse}
            onClick={e => getVerse(e)}
          >
            {verse}
          </button>
        ))}
      </Container>
    </div>
  );
};

BookLayout.propTypes = {
  params: PropTypes.instanceOf(Object).isRequired,
  loadVerse: PropTypes.func.isRequired,
  getVerse: PropTypes.func.isRequired,
};

export default BookLayout;
