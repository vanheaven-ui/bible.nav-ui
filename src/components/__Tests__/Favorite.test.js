import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
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
