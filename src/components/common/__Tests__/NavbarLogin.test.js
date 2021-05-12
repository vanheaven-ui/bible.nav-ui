import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import rootDiv from '../../../testHelper';
import store from '../../../redux/store';
import '@testing-library/jest-dom';
import LoggedInNavbar from '../NavbarLogin';

describe('NavbarLoggedIn Component', () => {
  const login = () => false;

  it('renders without crashing', () => {
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <LoggedInNavbar login={login} />
        </Router>
      </Provider>, rootDiv(),
    );
  });

  it('does not change unexpectedly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <Router>
          <LoggedInNavbar login={login} />
        </Router>
      </Provider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the correct wrapper element', () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <LoggedInNavbar login={login} />
        </Router>
      </Provider>,
    );
    expect(container.firstChild).toHaveAttribute('class', 'navbar');
  });
});
