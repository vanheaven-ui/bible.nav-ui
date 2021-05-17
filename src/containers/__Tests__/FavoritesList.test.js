import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import FavoritesList from '../FavoritesList';
import rootDiv from '../../testHelper';
import store from '../../redux/store';
import '@testing-library/jest-dom';

describe('FavoritesList Component', () => {
  const login = () => true;

  // Smoke test
  it('renders without carshing', () => {
    ReactDOM.render(<Provider store={store}><FavoritesList login={login} /></Provider>, rootDiv());
  });

  it('renders your favorites heading', () => {
    render(<Provider store={store}><FavoritesList login={login} /></Provider>);
    expect(screen.getByText('Your Favorite Verses')).toBeInTheDocument();
  });

  it('renders the correct the correct wrapper element', () => {
    const { container } = render(
      <Provider store={store}><FavoritesList login={login} /></Provider>,
    );
    expect(container.firstChild.classList.contains('favorites'));
  });
});
