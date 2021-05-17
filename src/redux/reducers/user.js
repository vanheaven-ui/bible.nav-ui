import {
  CURRENT_USER, REMOVE_USER,
} from '../actionTypes';

const initState = {
  user: {},
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case CURRENT_USER:
      return {
        ...state,
        user: action.payload,
      };
    case REMOVE_USER:
      return {
        ...state,
        user: {},
        jwt: '',
      };
    default:
      return state;
  }
};

export default userReducer;
