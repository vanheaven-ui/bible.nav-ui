import { GET_VERSEID, GET_VERSES } from '../actionTypes';

const versesReducer = (state = { verses: [], id: '' }, action) => {
  switch (action.type) {
    case GET_VERSES:
      return {
        ...state,
        verses: action.payload,
      };
    case GET_VERSEID:
      return {
        ...state,
        id: action.id,
      };
    default:
      return state;
  }
};

export default versesReducer;
