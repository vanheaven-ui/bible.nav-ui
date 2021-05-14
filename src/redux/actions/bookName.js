import { GET_BOOK_NAME } from '../actionTypes';

const getBookName = name => (
  {
    type: GET_BOOK_NAME,
    name,
  }
);

export default getBookName;
