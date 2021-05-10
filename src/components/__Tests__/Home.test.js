import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import rootDiv from '../../testHelper';
import store from '../../redux/store';
import '@testing-library/jest-dom';
import Home from '../Home';
import { dateOptions } from '../../constants';

describe('Home Component', () => {
  let dateMock = new Date();
  dateMock = jest.fn(() => 1620644512642);
  it('renders without crashing', () => {
    ReactDOM.render(
      <Provider store={store}><Router><Home /></Router></Provider>, rootDiv(),
    );
  });

  it('does not change unexpectedly', () => {
    const tree = renderer.create(
      <Provider store={store}><Router><Home /></Router></Provider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the correct wrapper element', () => {
    const { container } = render(
      <Provider store={store}><Router><Home /></Router></Provider>,
    );
    expect(container.firstChild.classList.contains('App')).toBe(true);
  });
});
