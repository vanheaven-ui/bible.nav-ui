import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import rootDiv from '../../testHelper';
import store from '../../redux/store';
import '@testing-library/jest-dom';
import Login from '../Login';

describe('Login Component', () => {
  const update = () => '';

  it('renders without crashing', () => {
    ReactDOM.render(
      <Provider store={store}><Router><Login update={update} /></Router></Provider>, rootDiv(),
    );
  });

  it('does not change unexpectedly', () => {
    const tree = renderer.create(
      <Provider store={store}><Router><Login update={update} /></Router></Provider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the correct wrapper element', () => {
    const { container } = render(
      <Provider store={store}><Router><Login update={update} /></Router></Provider>,
    );
    expect(container.firstChild.classList.contains('login')).toBe(true);
  });

  it('displays loading message on login click', () => {
    render(
      <Provider store={store}><Router><Login update={update} /></Router></Provider>,
    );
    fireEvent.click(screen.getByText('Login'));
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
    expect(screen.getByRole('button')).toHaveTextContent('Logging in');
  });
});
