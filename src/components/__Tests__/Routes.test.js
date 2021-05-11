import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import rootDiv from '../../testHelper';
import '@testing-library/jest-dom';
import Routes from '../Routes';
import store from '../../redux/store';

describe('Routes Component', () => {
  beforeAll(() => {
    global.Date.now = jest.fn(() => 1620718496066);
  });

  it('renders without crashing', () => {
    ReactDOM.render(<Provider store={store}><Routes /></Provider>, rootDiv());
  });
  
  it('does not change unexpectedly', () => {
    const tree = renderer.create(
      <Provider store={store}><Routes /></Provider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });  
});
