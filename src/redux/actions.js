import {
  CURRENT_USER,
  GET_BOOK_NAME,
  GET_CHAPTERS,
  GET_CHAPTER_ID,
  GET_CHAPTER_NUM,
  GET_FAVORITES,
  GET_VERSEID,
  GET_VERSES,
  REMOVE_FAVORITE,
  REMOVE_USER,
} from './actionTypes';

const getCurrentUser = user => (
  {
    type: CURRENT_USER,
    payload: user,
  }
);

const removeUser = {
  type: REMOVE_USER,
};

const getChapters = chapters => (
  {
    type: GET_CHAPTERS,
    payload: chapters,
  }
);

const getVerses = verses => (
  {
    type: GET_VERSES,
    payload: verses,
  }
);

const getVerseId = id => (
  {
    type: GET_VERSEID,
    id,
  }
);

const getChapterID = id => (
  {
    type: GET_CHAPTER_ID,
    id,
  }
);

const getBookName = name => (
  {
    type: GET_BOOK_NAME,
    name,
  }
);

const getChapterNum = num => (
  {
    type: GET_CHAPTER_NUM,
    num,
  }
);

const getFavorites = favorites => (
  {
    type: GET_FAVORITES,
    payload: favorites,
  }
);

const removeFavorite = id => (
  {
    type: REMOVE_FAVORITE,
    id,
  }
);

export {
  getCurrentUser,
  getChapters,
  getVerses,
  getChapterID,
  getBookName,
  getChapterNum,
  removeUser,
  getVerseId,
  getFavorites,
  removeFavorite,
};
