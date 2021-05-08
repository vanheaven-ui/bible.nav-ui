import { GET_BOOK_NAME } from '../actionTypes';

const nameReducer = (state = '', action) => {
  switch (action.type) {
    case GET_BOOK_NAME:
      return action.name;
    default:
      return state;
  }
};

export default nameReducer;
