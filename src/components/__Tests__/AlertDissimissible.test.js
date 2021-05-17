import React from 'react';
import ReactDOM from 'react-dom';
import rootDiv from '../../testHelper';
import '@testing-library/jest-dom';
import AlertDisimissible from '../AlertDissimissible';

describe('AlertDissimissible component', () => {
  const handleClick = () => '';
  const click = true;

  it('renders without crashing', () => {
    ReactDOM.render(
      <AlertDisimissible
        handleClick={handleClick}
        error="Testing"
        click={click}
      />, rootDiv(),
    );
  });
});
