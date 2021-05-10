import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import FavoritesList from '../FavoritesList';
import rootDiv from '../../testHelper';
import store from '../../redux/store';
import '@testing-library/jest-dom';

// Smoke test
it('renders without carshing', () => {
  ReactDOM.render(<Provider store={store}><FavoritesList /></Provider>, rootDiv());
});

it('renders your favorites heading', () => {
  render(<Provider store={store}><FavoritesList /></Provider>);
  expect(screen.getByText('Your Favorites')).toBeInTheDocument();
});
