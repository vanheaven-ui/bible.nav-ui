import {
  ADD_FAVORITE, GET_FAVORITES, REMOVE_FAVORITE, REMOVE_USER,
} from '../actionTypes';

const initState = {
  favorites: [],
};

const userFavorites = (state = initState, action) => {
  switch (action.type) {
    case GET_FAVORITES:
      return {
        ...state,
        favorites: action.payload,
      };
    case ADD_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(favorite => favorite.id !== action.id),
      };
    case REMOVE_USER:
      return {
        ...state,
        favorites: [],
      };
    default:
      return state;
  }
};

export default userFavorites;
