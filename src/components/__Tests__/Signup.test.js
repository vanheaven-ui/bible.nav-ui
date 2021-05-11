import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import rootDiv from '../../testHelper';
import '@testing-library/jest-dom';
import Signup from '../Signup';

it('renders without crashing', () => {
  ReactDOM.render(<Router><Signup /></Router>, rootDiv());
});

it('does not change unexpectedly', () => {
  const tree = renderer.create(
    <Router><Signup /></Router>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the correct wrapper element', () => {
  const { container } = render(
    <Router><Signup /></Router>,
  );
  expect(container.firstChild.classList.contains('signup')).toBe(true);
});

it('displays loading message on login click', () => {
  render(
    <Router><Signup /></Router>,
  );
  fireEvent.click(screen.getByText('Register'));
  expect(screen.getByRole('button')).toHaveAttribute('disabled');
  expect(screen.getByRole('button')).toHaveTextContent('Registering');
});
