import { GET_CHAPTER_NUM } from '../../actionTypes';

const getChapterNum = num => (
  {
    type: GET_CHAPTER_NUM,
    num,
  }
);

export default getChapterNum;
