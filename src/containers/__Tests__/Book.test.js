import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import rootDiv from '../../testHelper';
import store from '../../redux/store';
import '@testing-library/jest-dom';
import Book from '../Book';

describe('Book Component', () => {
  afterAll(cleanup);

  const login = true;

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(() => ({
      id: 'JHN',
    })),
  }));

  it('renders without crashing', () => {
    ReactDOM.render(
      <Provider store={store}><Book login={login} /></Provider>, rootDiv(),
    );
  });
});
