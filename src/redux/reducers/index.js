import { combineReducers } from 'redux';
import chaptersReducer from './chapter';
import chapterIDReducer from './chapterID';
import nameReducer from './name';
import userReducer from './user';
import versesReducer from './verses';

const rootReducer = combineReducers({
  user: userReducer,
  chapter: chaptersReducer,
  verses: versesReducer,
  chapterId: chapterIDReducer,
  name: nameReducer,
});

export default rootReducer;
