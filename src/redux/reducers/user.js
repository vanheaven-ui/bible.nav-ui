import {
  CURRENT_USER, GET_FAVORITES, REMOVE_FAVORITE, REMOVE_USER,
} from '../actionTypes';

const userReducer = (state = {}, action) => {
  console.log(state);
  switch (action.type) {
    case CURRENT_USER:
      return action.payload;
    case REMOVE_USER:
      console.log(state);
      return {
        ...state,
        user: {},
        jwt: '',
      };
    case GET_FAVORITES:
      return {
        ...state,
        favorites: action.payload,
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default userReducer;
