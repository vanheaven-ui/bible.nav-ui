import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import rootDiv from '../../../testHelper';
import store from '../../../redux/store';
import '@testing-library/jest-dom';
import Footer from '../Footer';

it('renders without crashing', () => {
  ReactDOM.render(<Router><Footer /></Router>, rootDiv());
});
