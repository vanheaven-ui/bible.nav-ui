import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import rootDiv from '../../testHelper';
import store from '../../redux/store';
import '@testing-library/jest-dom';
import BookLayout from '../BookLayout';

describe('BookLayout Component', () => {
  const id = 'JHN';
  const loadVerse = () => '';
  const getVerse = () => '';
  const params = {
    chapters: [
      { bibleId: "55212e3cf5d04d49-01", bookId: "MRK", id: "MRK.1", number: "1", reference: "Mark 1" },
      { bibleId: "55212e3cf5d04d49-01", bookId: "MRK", id: "MRK.2", number: "2", reference: "Mark 2" },
      { bibleId: "55212e3cf5d04d49-01", bookId: "MRK", id: "MRK.3", number: "3", reference: "Mark 3" },
      { bibleId: "55212e3cf5d04d49-01", bookId: "MRK", id: "MRK.4", number: "4", reference: "Mark 4" },
    ],
    bookName: 'John',
    verses: ['1', '2', '3', '4'],
  };

  afterEach(cleanup);

  it('renders without crashing', () => {
    ReactDOM.render(
      <BookLayout params={params} loadVerse={loadVerse} getVerse={getVerse} id={id} />, rootDiv(),
    );
  });

  it('does not change unexpectedly', () => {
    const tree = renderer.create(
      <BookLayout params={params} loadVerse={loadVerse} getVerse={getVerse} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the correct wrapper element', () => {
    const { container } = render(
      <BookLayout params={params} loadVerse={loadVerse} getVerse={getVerse} />,
    );
    expect(container.firstChild.classList.contains('book-details_wrap')).toBe(true);
  });
});
