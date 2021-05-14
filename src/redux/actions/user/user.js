import { CURRENT_USER } from '../../actionTypes';

const getCurrentUser = user => (
  {
    type: CURRENT_USER,
    payload: user,
  }
);

export default getCurrentUser;
