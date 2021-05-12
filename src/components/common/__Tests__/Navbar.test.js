import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import rootDiv from '../../../testHelper';
import '@testing-library/jest-dom';
import Navbar from '../Navbar';

it('renders without crashing', () => {
  ReactDOM.render(<Router><Navbar /></Router>, rootDiv());
});

it('does not change unexpectedly', () => {
  const tree = renderer.create(<Router><Navbar /></Router>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the correct wrapper element', () => {
  const { container } = render(<Router><Navbar /></Router>);
  expect(container.firstChild.classList.contains('navbar'));
});
