import { GET_CHAPTER_ID, GET_CHAPTER_NUM } from '../actionTypes';

const initState = {
  chapterID: '',
  chapterNum: '',
};

const chapterIDReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_CHAPTER_ID:
      return {
        ...state,
        chapterID: action.id,
      };
    case GET_CHAPTER_NUM:
      return {
        ...state,
        chapterNum: action.num,
      };
    default:
      return state;
  }
};

export default chapterIDReducer;
