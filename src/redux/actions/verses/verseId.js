import { GET_VERSEID } from '../../actionTypes';

const getVerseId = id => ({
  type: GET_VERSEID,
  id,
});

export default getVerseId;
