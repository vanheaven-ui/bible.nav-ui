import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import rootDiv from '../../../testHelper';
import store from '../../../redux/store';
import '@testing-library/jest-dom';
import LoggedInNavbar from '../NavbarLogin';

it('renders without crashing', () => {
  const status = () => true;

  ReactDOM.render(
    <Provider store={store}><Router><LoggedInNavbar status={status} /></Router></Provider>, rootDiv(),
  );
});
