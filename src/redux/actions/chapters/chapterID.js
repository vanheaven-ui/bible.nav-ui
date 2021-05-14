import { GET_CHAPTER_ID } from '../../actionTypes';

const getChapterID = id => (
  {
    type: GET_CHAPTER_ID,
    id,
  }
);

export default getChapterID;
