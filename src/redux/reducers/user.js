import {
  ADD_FAVORITE,
  CURRENT_USER, GET_FAVORITES, REMOVE_FAVORITE, REMOVE_USER,
} from '../actionTypes';

const initState = {
  user: {},
  jwt: '',
  favorites: [],
};

const userReducer = (state = initState, action) => {
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
        favorites: state.favorites.filter(favorite => favorite.id !== action.id),
      };
    case ADD_FAVORITE:
      console.log(action.payload);
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    default:
      return state;
  }
};

export default userReducer;
