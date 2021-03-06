import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import rootDiv from '../../testHelper';
import store from '../../redux/store';
import '@testing-library/jest-dom';
import Home from '../Home';

describe('Home Component', () => {
  global.Date.now = jest.fn(() => 1620718496066);
  const login = () => true;
  it('renders without crashing', () => {
    ReactDOM.render(
      <Provider store={store}><Router><Home login={login} /></Router></Provider>, rootDiv(),
    );
  });

  it('does not change unexpectedly', () => {
    const tree = renderer.create(
      <Provider store={store}><Router><Home login={login} /></Router></Provider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the correct wrapper element', () => {
    const { container } = render(
      <Provider store={store}><Router><Home login={login} /></Router></Provider>,
    );
    expect(container.firstChild.classList.contains('App')).toBe(true);
  });
});
