import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import rootDiv from '../../testHelper';
import '@testing-library/jest-dom';
import NotFound from '../404NotFound';

it('renders without crashing', () => {
  ReactDOM.render(<NotFound />, rootDiv());
});

it('does not change unexpectedly', () => {
  const tree = renderer.create(
    <NotFound />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the correct wrapper element', () => {
  const { container } = render(
    <NotFound />,
  );
  expect(container.firstChild.classList.contains('not-found')).toBe(true);
});
