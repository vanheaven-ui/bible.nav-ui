import { GET_CHAPTERS } from '../actionTypes';

const chaptersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CHAPTERS:
      return action.payload;
    default:
      return state;
  }
};

export default chaptersReducer;
