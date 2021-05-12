import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import rootDiv from '../../testHelper';
import '@testing-library/jest-dom';
import VerseLayout from '../VerseLayout';

describe('VerseLayout Component', () => {
  afterEach(cleanup);

  const params = {
    bookName: 'John',
    chapterNum: '1',
    verse: '1',
    text: 'In the begining...',
  };
  const handleNext = () => '';
  const addFavorite = () => '';
  const favoriteStatus = false;
  const isLoading = false;

  it('renders without crashing', () => {
    ReactDOM.render(
      <VerseLayout
        params={params}
        handleNext={handleNext}
        addFavorite={addFavorite}
        favoriteStatus={favoriteStatus}
        isLoading={isLoading}
      />, rootDiv(),
    );
  });

  it('does not change unexpectedly', () => {
    const tree = renderer.create(
      <VerseLayout
        params={params}
        handleNext={handleNext}
        addFavorite={addFavorite}
        favoriteStatus={favoriteStatus}
        isLoading={isLoading}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the correct wrapper element', () => {
    const { container } = render(
      <VerseLayout
        params={params}
        handleNext={handleNext}
        addFavorite={addFavorite}
        favoriteStatus={favoriteStatus}
        isLoading={isLoading}
      />,
    );
    expect(container.firstChild.classList.contains('verse-layout-wrap')).toBe(true);
  });
});
