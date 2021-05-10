import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import rootDiv from '../../testHelper';
import '@testing-library/jest-dom';
import AlertDisimissible from '../AlertDissimissible';

describe('AlertDissimissible component', () => {
  const handleClick = () => '';

  it('renders without crashing', () => {
    ReactDOM.render(<AlertDisimissible handleClick={handleClick} error="" />, rootDiv());
  });

  it('does not change unexpectedly', () => {
    const tree = renderer.create(
      <AlertDisimissible handleClick={handleClick} error="" />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the correct wrapper element', () => {
    const { container } = render(
      <AlertDisimissible handleClick={handleClick} error="" />,
    );
    expect(container.firstChild.classList.contains('show')).toBe(true);
  });
});
