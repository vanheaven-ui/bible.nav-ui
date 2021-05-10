import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import rootDiv from '../../testHelper';
import store from '../../redux/store';
import '@testing-library/jest-dom';
import Book from '../Book';

describe('Book Component', () => {
  const login = true;

  it('renders without crashing', () => {
    ReactDOM.render(<Provider store={store}><Book login={login} /></Provider>, rootDiv());
  });

  it('does not change unexpectedly', () => {
    const tree = renderer.create(
      <Provider store={store}><Book login={login} /></Provider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the correct wrapper element', () => {
    const { container } = render(
      <Provider store={store}><Book login={login} /></Provider>,
    );
    expect(container.firstChild.classList.contains('book-details')).toBe(true);
  });
});
