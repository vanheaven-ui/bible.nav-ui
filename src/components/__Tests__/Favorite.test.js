import React from 'react';
import ReactDOM from 'react-dom';
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import rootDiv from '../../testHelper';
import '@testing-library/jest-dom';
import Favorite from '../Favorite';

describe('Favorite Component test', () => {
  const favorites = [];
  const removeFavorite = () => '';

  afterEach(cleanup);

  it('renders without crashing', () => {
    ReactDOM.render(
      <Favorite favorites={favorites} removeFavorite={removeFavorite} />, rootDiv(),
    );
  });

  it('does not change unexpectedly', () => {
    const tree = renderer.create(
      <Favorite favorites={favorites} removeFavorite={removeFavorite} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
